package com.kpi.kpi_duties_db.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 */

@Controller
public class MainController {

    @RequestMapping(value = "/*", method = RequestMethod.GET)
    public String goIndex() {

        return "index";
    }
}
