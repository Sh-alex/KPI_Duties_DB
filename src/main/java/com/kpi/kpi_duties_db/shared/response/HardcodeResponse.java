package com.kpi.kpi_duties_db.shared.response;


import java.util.HashMap;
import java.util.Map;

/**
 * Created by Yaroslav on 20.12.2016.
 */
public class HardcodeResponse {

    public Map<Object, Object> createResponse(String username) {
        String img = "";

        boolean addInfoFromAnotherOccupationsBool = true;
        boolean searchOccupationsBool = true;
       boolean  addNewOccupationsBool = true;
       boolean  delOccupationsBool = true;
       boolean  downloadSearchResultsBool = true;
       boolean  editOcupationsBool = true;
       boolean  ctrlDcBool = true;
       boolean  delValuesBoolControl = true;
       boolean editValuesBoolControl = true;
       boolean addNewValuesBoolControl = true;
        boolean showUsingOccupationsBoolControl = true;




        String surname = "Генаш";
        String name = "Максим";
        String accessName = "Перегляд, редагування, вставка";

        if (username.equals("editor")) {

          addInfoFromAnotherOccupationsBool = true;
           searchOccupationsBool = true;
            addNewOccupationsBool = true;
            delOccupationsBool = false;
            downloadSearchResultsBool = true;
            editOcupationsBool = true;
            ctrlDcBool = true;
            showUsingOccupationsBoolControl = true;
            delValuesBoolControl =false;
            editValuesBoolControl = true;
            addNewValuesBoolControl = true;
            surname = "Гальченко";
            name = "Ярослав";
            accessName = "Перегляд, редагування, вставка, видалення";

        } else if (username.equals("reader")) {


            addInfoFromAnotherOccupationsBool = false;
            searchOccupationsBool = true;
            addNewOccupationsBool = false;
            delOccupationsBool = false;
            downloadSearchResultsBool = true;
            editOcupationsBool = false;
            ctrlDcBool = true;

            showUsingOccupationsBoolControl = true;
            delValuesBoolControl =false;
            editValuesBoolControl = false;
            addNewValuesBoolControl = false;



            surname = "Шевченко";
            name = "Олександр";
            accessName = "Перегляд";
        }

        Map<Object, Object> map = new HashMap<>();

            Map<Object, Object> permissions = new HashMap<>();

            Map<Object, Object> editOccupations = new HashMap<>();
            Map<Object, Object> parts = new HashMap<>();
            editOccupations.put("show", editOcupationsBool);
            editOccupations.put("parts", parts);
            permissions.put("editOccupations", editOccupations);


            Map<Object, Object> addInfoFromAnotherOccupations = new HashMap<>();
            parts = new HashMap<>();
            addInfoFromAnotherOccupations.put("show", addInfoFromAnotherOccupationsBool);
            addInfoFromAnotherOccupations.put("parts", parts);
            permissions.put("addInfoFromAnotherOccupations", addInfoFromAnotherOccupations);


            Map<Object, Object> searchOccupations = new HashMap<>();
            parts = new HashMap<>();
        searchOccupations.put("show",  searchOccupationsBool);
        searchOccupations.put("parts", parts);
            permissions.put("searchOccupations", searchOccupations);


            Map<Object, Object> delOccupations = new HashMap<>();
            parts = new HashMap<>();
            delOccupations.put("show", delOccupationsBool);
            delOccupations.put("parts", parts);
            permissions.put("delOccupations", delOccupations);


            Map<Object, Object> downloadSearchResults = new HashMap<>();
            parts = new HashMap<>();
            downloadSearchResults.put("show", downloadSearchResultsBool);
            downloadSearchResults.put("parts", parts);
            permissions.put("downloadSearchResults", downloadSearchResults);



            Map<Object, Object> ctrlDc = new HashMap<>();
            parts = new HashMap<>();
            parts.put("delValues", delValuesBoolControl);
            parts.put("editValues", editValuesBoolControl );
            parts.put("addNewValues", addNewValuesBoolControl);
            parts.put("showUsingOccupations", showUsingOccupationsBoolControl);
            ctrlDc.put("show", ctrlDcBool);
            ctrlDc.put("parts", parts);
            permissions.put("ctrlDc", ctrlDc);




            Map<Object, Object> addNewOccupations = new HashMap<>();
            parts = new HashMap<>();
            addNewOccupations.put("show", addNewOccupationsBool);
            addNewOccupations.put("parts", parts);
            permissions.put("addNewOccupations", addNewOccupations);
            permissions.put("accessName", accessName);

            map.put("permissions", permissions);
            map.put("img", img);
            map.put("Surname", surname);
            map.put("Name", name);
            return map;
        }
    }
