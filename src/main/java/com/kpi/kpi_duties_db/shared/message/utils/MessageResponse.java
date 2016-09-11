package com.kpi.kpi_duties_db.shared.message.utils;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Olexandr Shevchenko
 * @version 1.0
 * @since 11.09.2016
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class MessageResponse {

    private String code;
    private String clientMessage;
    private String serverMessage;
    private List<MessageProperty> messageProperties = new ArrayList<>();

    public MessageResponse() {
    }

    public MessageResponse(String code, String clientMessage, String serverMessage) {
        this.setCode(code);
        this.setClientMessage(clientMessage);
        this.setServerMessage(serverMessage);
    }

    public String getClientMessage() {
        return clientMessage;
    }

    public void setClientMessage(String clientMessage) {
        this.clientMessage = clientMessage;
    }

    public String getServerMessage() {
        return serverMessage;
    }

    public void setServerMessage(String serverMessage) {
        this.serverMessage = serverMessage;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public List<MessageProperty> getMessageProperties() {
        return messageProperties;
    }

    public void setMessageProperties(List<MessageProperty> messageProperties) {
        this.messageProperties = messageProperties;
    }

}
