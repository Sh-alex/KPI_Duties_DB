package com.kpi.kpi_duties_db.shared.response;

import java.util.Map;

/**
 * Created by Yaroslav on 16.12.2016.
 */
public class FormsResponse {

    private Boolean show;

    private Map parts;

    public Map getParts() {
        return parts;
    }

    public void setParts(Map map) {
        this.parts = map;
    }


    public Boolean getShow() {
        return show;
    }

    public void setShow(Boolean show) {
        this.show = show;
    }


}
