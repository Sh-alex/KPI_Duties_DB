package com.kpi.kpi_duties_db.shared.request.occupation.support;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 22.12.2016
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class InfoDocOccupation {

    private String docName;

    private String docLink;

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getDocLink() {
        return docLink;
    }

    public void setDocLink(String docLink) {
        this.docLink = docLink;
    }
}
