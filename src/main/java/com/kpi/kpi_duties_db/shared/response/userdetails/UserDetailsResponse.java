package com.kpi.kpi_duties_db.shared.response.userdetails;

import com.kpi.kpi_duties_db.domain.ControlState;
import com.kpi.kpi_duties_db.domain.FormState;
import com.kpi.kpi_duties_db.repository.EmployeeRepository;
import com.kpi.kpi_duties_db.repository.PermissionsRepository;
import com.kpi.kpi_duties_db.service.DetailService;
import com.kpi.kpi_duties_db.service.TokenParser;
import com.kpi.kpi_duties_db.shared.response.FormsResponse;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.lang.JoseException;

import javax.xml.bind.DatatypeConverter;
import java.security.spec.InvalidKeySpecException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by Yaroslav on 19.12.2016.
 */
public class UserDetailsResponse {


    private TokenParser tokenParser;
    private PermissionsRepository permissionsRepository;
    private DetailService detailService;


    public UserDetailsResponse(TokenParser tokenParser, PermissionsRepository permissionsRepository, DetailService detailService) {
        this.tokenParser = tokenParser;
        this.permissionsRepository = permissionsRepository;
        this.detailService = detailService;
    }


    public   Map<String, Object> prepareUserDetailsResponce(String authHeader) throws MalformedClaimException, InvalidKeySpecException, JoseException, InvalidJwtException {
        Map<String, Object> resultMap = new HashMap<>();
       String username = tokenParser.getUsernameFromToken(authHeader);

		String imageBase64 = DatatypeConverter.printBase64Binary(detailService.getEmployeeByName(username).getPhoto());
		resultMap.put("Name", detailService.getPassportsByName(username).getName());
		resultMap.put("Surname", detailService.getPassportsByName(username).getSurname());
		resultMap.put("img", imageBase64);

       String accessName = permissionsRepository.loadUserByUsername(username).getPermissionForProjects().getAccess().getName();
       Set<FormState> formStates = permissionsRepository.loadUserByUsername(username).getPermissionForProjects().getFormStates();
       Set<ControlState> controlStates = permissionsRepository.loadUserByUsername(username).getPermissionForProjects().getControlStates();
       Map<Object, Object> mapForms = new HashMap<>();
       mapForms.put("accessName", accessName);
       for (FormState formState : formStates) {
           Map<String, Boolean> controlsInf = new HashMap<>();
           String formName = formState.getForm().getName();
           FormsResponse formsResponse = new FormsResponse();
           formsResponse.setShow(formState.getVisualState().isVisible());
           for (ControlState controlState : controlStates) {
               controlsInf.put(controlState.getControl().getControlName(), controlState.getVisualState().isVisible());
           }
           formsResponse.setParts(controlsInf);
           mapForms.put(formName, formsResponse);
       }
       resultMap.put("permissions", mapForms);

       return resultMap;
   }

}
