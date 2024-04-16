import React from "react"
import "./footer.css"

function Footer () {
    return (
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div class="col-md-4 d-flex align-items-center">
            <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"></a>
            <span class="mb-3 mb-md-0 text-muted">&copy; 2024 E-Beauty, Inc </span>
            </div>

            <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                <li class="ms-3"><a class="text-muted" href="#facebook"><i class="fab fa-facebook"></i></a></li>
                <li class="ms-3"><a class="text-muted" href="#instagram"><i class="fab fa-instagram"></i></a></li>
                <li class="ms-3"><a class="text-muted" href="#twitter"><i class="fa fa-twitter"></i></a></li>
            </ul>
        </footer>
    );
}

export default Footer;