package com.kpi.kpi_duties_db.rest;
import com.kpi.kpi_duties_db.repository.EmployeeRepository;
import com.kpi.kpi_duties_db.repository.PermissionsRepository;
import com.kpi.kpi_duties_db.service.DetailService;
import com.kpi.kpi_duties_db.service.TokenParser;
import com.kpi.kpi_duties_db.shared.response.HardcodeResponse;
import org.jose4j.jwt.MalformedClaimException;
import org.jose4j.jwt.consumer.InvalidJwtException;
import org.jose4j.lang.JoseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Map;


@Path("/userInfo")
@Component
public class UserDetailsService {

	@Autowired
 	private DetailService detailService;

	@Autowired
	private TokenParser tokenParser;

	@Autowired
	private PermissionsRepository permissionsRepository;


    @GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getUserDetails(@HeaderParam("Authorization") String authHeader) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidJwtException, MalformedClaimException, JoseException, InvalidKeySpecException {
//		UserDetailsResponse userDetailsResponse = new UserDetailsResponse(tokenParser, permissionsRepository, detailService);
//		Map<String, Object> map = userDetailsResponse.prepareUserDetailsResponce(authHeader);
//			return Response.status(200).entity(map).build();
		HardcodeResponse hardcodeResponse = new HardcodeResponse();
		Map<Object,Object> map = hardcodeResponse.createResponse(tokenParser.getUsernameFromToken(authHeader));
		return Response.status(200).entity(map).build();
		}





}