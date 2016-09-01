package com.kpi.kpi_duties_db.shared.addingoccupation.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.kpi.kpi_duties_db.shared.addingoccupation.request.support.*;

import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */

public class OccupationRequest {

    @JsonProperty("name")
    private NameOccupation nameOccupation;

    @JsonProperty("features")
    private FeaturesOccupation featuresOccupation;

    @JsonProperty("duration")
    private DurationOccupation durationOccupation;

    @JsonProperty("codes")
    private List<CodeOccupation> codes;

    @JsonProperty("responsibilities")
    private List<RequirementsOccupation> responsibilities;

    @JsonProperty("haveToKnow")
    private List<RequirementsOccupation> mustKnow;

    @JsonProperty("ualiffRequir")
    private List<RequirementsOccupation> qualificationRequirements;

    public NameOccupation getNameOccupation() {
        return nameOccupation;
    }

    public void setNameOccupation(NameOccupation nameOccupation) {
        this.nameOccupation = nameOccupation;
    }

    public FeaturesOccupation getFeaturesOccupation() {
        return featuresOccupation;
    }

    public void setFeaturesOccupation(FeaturesOccupation featuresOccupation) {
        this.featuresOccupation = featuresOccupation;
    }

    public DurationOccupation getDurationOccupation() {
        return durationOccupation;
    }

    public void setDurationOccupation(DurationOccupation durationOccupation) {
        this.durationOccupation = durationOccupation;
    }

    public List<CodeOccupation> getCodes() {
        return codes;
    }

    public void setCodes(List<CodeOccupation> codes) {
        this.codes = codes;
    }

    public List<RequirementsOccupation> getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(List<RequirementsOccupation> responsibilities) {
        this.responsibilities = responsibilities;
    }

    public List<RequirementsOccupation> getMustKnow() {
        return mustKnow;
    }

    public void setMustKnow(List<RequirementsOccupation> mustKnow) {
        this.mustKnow = mustKnow;
    }

    public List<RequirementsOccupation> getQualificationRequirements() {
        return qualificationRequirements;
    }

    public void setQualificationRequirements(List<RequirementsOccupation> qualificationRequirements) {
        this.qualificationRequirements = qualificationRequirements;
    }
}
