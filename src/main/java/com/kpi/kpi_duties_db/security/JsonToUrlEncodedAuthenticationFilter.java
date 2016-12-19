package com.kpi.kpi_duties_db.security;

import org.apache.catalina.connector.RequestFacade;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Objects;

/**
 * Created by Yaroslav on 21.11.2016.
 */
@Component
@Order(value = Integer.MIN_VALUE)
public class JsonToUrlEncodedAuthenticationFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {

        try {


            if (Objects.equals(request.getContentType(), "application/json") && Objects.equals(((RequestFacade) request).getServletPath(), "/oauth/token")) {
                InputStream is = request.getInputStream();
                ByteArrayOutputStream buffer = new ByteArrayOutputStream();

                int nRead;
                byte[] data = new byte[16384];

                while ((nRead = is.read(data, 0, data.length)) != -1) {
                    buffer.write(data, 0, nRead);
                }
                buffer.flush();
                byte[] json = buffer.toByteArray();

                HashMap<String, String> result = new ObjectMapper().readValue(json, HashMap.class);
                HashMap<String, String[]> r = new HashMap<>();
                for (String key : result.keySet()) {
                    String[] val = new String[1];
                    val[0] = result.get(key);
                    r.put(key, val);
                }

                String[] val = new String[1];
                val[0] = ((RequestFacade) request).getMethod();
                r.put("_method", val);

                HttpServletRequest s = new MyServletRequestWrapper(((HttpServletRequest) request), r);
                chain.doFilter(s, response);
            } else {
                chain.doFilter(request, response);
            }


        }catch (ClassCastException ce){
            chain.doFilter(request,response);
        }
    }
    @Override
    public void destroy() {
    }
}
