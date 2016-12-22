package com.kpi.kpi_duties_db.shared.request.occupation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kpi.kpi_duties_db.shared.request.occupation.support.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 24.08.2016
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OccupationRequest {

    @NotNull
    @Valid
    @JsonProperty("name")
    private NameOccupation nameOccupation;

    private InfoDocOccupation mainInfoDocRef;

    private InfoDocOccupation descriptionDocRef;

    @Valid
    @JsonProperty("durations")
    private List<DurationOccupation> durationOccupation;

    @JsonProperty("codes")
    private List<CodeOccupation> codes;

    @JsonProperty("responsibilities")
    private List<RequirementsOccupation> responsibilities;

    @JsonProperty("haveToKnow")
    private List<RequirementsOccupation> mustKnow;

    @JsonProperty("qualiffRequir")
    private List<RequirementsOccupation> qualificationRequirements;

    public NameOccupation getNameOccupation() {
        return nameOccupation;
    }

    public void setNameOccupation(NameOccupation nameOccupation) {
        this.nameOccupation = nameOccupation;
    }

    public InfoDocOccupation getMainInfoDocRef() {
        return mainInfoDocRef;
    }

    public void setMainInfoDocRef(InfoDocOccupation mainInfoDocRef) {
        this.mainInfoDocRef = mainInfoDocRef;
    }

    public InfoDocOccupation getDescriptionDocRef() {
        return descriptionDocRef;
    }

    public void setDescriptionDocRef(InfoDocOccupation descriptionDocRef) {
        this.descriptionDocRef = descriptionDocRef;
    }

    public List<DurationOccupation> getDurationOccupation() {
        return durationOccupation;
    }

    public void setDurationOccupation(List<DurationOccupation> durationOccupation) {
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