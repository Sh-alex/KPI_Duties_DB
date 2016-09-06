package com.kpi.kpi_duties_db.shared.response.occupation.support;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 06.09.2016
 */

public class ItemById {

    private Integer id;

    private DataInItem data;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public DataInItem getData() {
        return data;
    }

    public void setData(DataInItem data) {
        this.data = data;
    }
}
