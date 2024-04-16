import pool from "../../config/db.js"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

// Get available appointments for a
// specific date.
async function getAvailableAppointments(req, res) {
    const { storeID, serviceName, date } = req.body
    const sql = await pool.connect()

    // Check user's token.
    let token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ error: "Unauthorized access" })
    }

    token = token.split(' ')[1]

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        return res.status(401).json({ error: "Unauthorized access" })
    }

    // Get the selected service's duration.
    try {
        // Retrieve service duration
        const serviceDurationQuery = await sql.query(
            "SELECT duration FROM service, store WHERE service.store = store.id AND service.name = $1 AND service.store = $2",
            [serviceName, storeID]
        )

        const serviceDurationMinutes = serviceDurationQuery.rows[0].duration

        // Retrieve open hours for the selected store
        const openHoursQuery = await sql.query(
            "SELECT open_at FROM store WHERE id = $1",
            [storeID]
        );

        const openHoursString = openHoursQuery.rows[0].open_at;
        const openHoursRanges = openHoursString.substring(1, openHoursString.length - 1).split('),[');
        const openHours = openHoursRanges.map(range => range.replace(/\[|\]|\(|\)/g, '').split(','));

        // Retrieve existing appointments for the selected store and date
        const appointmentsQuery = await sql.query(
        "SELECT hour, duration FROM appointment, service WHERE appointment.store = $1 AND closed_at = $2 AND appointment.service = service.id",
        [storeID, date]
        );

        // Get the existing appointments.
        const existingAppointments = appointmentsQuery.rows.map((appointment) => {
        const [hours, minutes] = appointment.hour.split(':');
        const appointmentDate = new Date(date);
        appointmentDate.setUTCHours(parseInt(hours), parseInt(minutes), 0, 0);
        return {
            start: appointmentDate,
            end: new Date(appointmentDate.getTime() + appointment.duration * 60000)
        };
        });

        const availableAppointments = [];

        // Find the available appointments according to
        // the open hours of the store.
        openHours.forEach((range) => {
            const [start, end] = range;

            let currentDate = new Date(date);
            currentDate.setUTCHours(parseInt(start), 0, 0, 0);

            const endDate = new Date(date);
            endDate.setUTCHours(parseInt(end), 0, 0, 0);

            while (currentDate < endDate) {
                const endTime = new Date(currentDate.getTime() + serviceDurationMinutes * 60000)

                const isAvailable = !existingAppointments.some((appointment) => {
                const existingStartTime = new Date(appointment.start);
                const existingEndTime = new Date(appointment.end);
                return (
                    (existingStartTime >= currentDate && existingStartTime < endTime) ||
                    (existingEndTime > currentDate && existingEndTime <= endTime) ||
                    (existingStartTime <= currentDate && existingEndTime >= endTime)
                );
                });

                if (isAvailable) {
                    availableAppointments.push(currentDate.toISOString().slice(11, 16)); // Push hour and minute as string
                }

                currentDate = endTime; // Move to the end of the current slot

                const existingAppointmentEndingNow = existingAppointments.find((appointment) => {
                    return appointment.end.getTime() === currentDate.getTime();
                });

                if (existingAppointmentEndingNow) {
                    currentDate = new Date(currentDate.getTime() + existingAppointmentEndingNow.duration * 60000)
                }
            }
        });

        res.json({ appointments: availableAppointments });
    } catch (error) {
        console.error("Error executing query or connecting to the database: ", error.message);
        return res.status(500).json({ error: "Internal server error" });
    } finally {
        sql.release()
    }
}

export default getAvailableAppointments
