package com.kpi.kpi_duties_db.rest;

import com.kpi.kpi_duties_db.service.DetailService;
import com.kpi.kpi_duties_db.service.TokenParser;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.DatatypeConverter;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.HashMap;
import java.util.Map;




@Path("/")
@Component
public class UserDetailsService {

	@Autowired
	DetailService detailService;


	@Autowired
	TokenParser tokenParser;



    @GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/userInfo")
	public Response getTrackInJSON(@HeaderParam("Authorization") String authHeader) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidJwtException, MalformedClaimException, JoseException, InvalidKeySpecException {
		Map<String, String> map = new HashMap<>();
		String usernameFromToken = tokenParser.getUsernameFromToken(authHeader);
		map.put("Name",  detailService.getPassportsByName(usernameFromToken).getName());
		map.put("Surname",  detailService.getPassportsByName(usernameFromToken).getSurname());
		String imageBase64 = DatatypeConverter.printBase64Binary(detailService.getEmployeeByName(usernameFromToken).getPhoto());
		map.put("img", imageBase64);
			return Response.status(200).entity(map).build();
		}



}