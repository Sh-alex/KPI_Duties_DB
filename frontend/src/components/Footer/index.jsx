import React, {Component} from "react";

import "./styles.less";
import imgKpiLogo from "../../common-assets/img/kpi-logo.jpg";

export default function Footer(props) {
    return <footer className="main-footer">
        <div className="container-fluid footer-inner">
            <div className="footer-info-block">
                <a href="http://kpi.ua/">
                    Національний технічний університет України <br />
                    "Київський політехнічний інститут імені Ігоря Сікорського" www.kpi.ua
                </a>
            </div>
            <div className="footer-kpi-logo-wrapper">
                <img src={imgKpiLogo} className="footer-kpi-logo" alt="kpi logo" />
            </div>
            <div className="footer-info-block">
                <a href="http://kbis.kpi.ua/">
                    Розробник: Конструкторське бюро <br />
                    Інформаційних систем www.kbis.kpi.ua
                </a>
            </div>
        </div>
    </footer>
}
