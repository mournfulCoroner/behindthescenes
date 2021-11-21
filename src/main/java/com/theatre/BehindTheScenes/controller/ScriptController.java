package com.theatre.BehindTheScenes.controller;

import com.theatre.BehindTheScenes.model.Replic;
import com.theatre.BehindTheScenes.model.Script;
import com.theatre.BehindTheScenes.service.ScriptService;
import com.theatre.BehindTheScenes.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
public class ScriptController {
    private final ScriptService scriptService;
    private final UserService userService;

    @Autowired
    public ScriptController(ScriptService scriptService, UserService userService) {
        this.scriptService = scriptService;
        this.userService = userService;
    }

    @GetMapping(value = "/api/scripts/search/{name}")
    public ResponseEntity<?> findByName(
            @PathVariable(name = "name") String name
    ) throws UnsupportedEncodingException {

        List<Script> scripts = scriptService.search(name);

        return scripts != null
                ? new ResponseEntity<>(scripts, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/api/scripts")
    public ResponseEntity<List<Script>> read() throws UnsupportedEncodingException {

        final List<Script> scripts = scriptService.findAll();

        return scripts != null &&  !scripts.isEmpty()
                ? new ResponseEntity<>(scripts, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping(value = "/api/scripts/{id}")
    public ResponseEntity<?> changeScriptStatus(@PathVariable(name = "id") int id, @RequestBody boolean inUse){

        byte status = (byte) (inUse ? 1 : 0);
        Script script = scriptService.update(id, status);

        return new ResponseEntity<>(script, HttpStatus.OK);
    }


    @GetMapping(value = "/api/scripts/{id}/replics")
    public ResponseEntity<List<Replic>> readScript(@PathVariable(name = "id") int id) {

        final List<Replic> replics = scriptService.getScript(id);

        return replics != null &&  !replics.isEmpty()
                ? new ResponseEntity<>(replics, HttpStatus.OK)
                : new ResponseEntity<>(null, HttpStatus.OK);
    }

    @GetMapping(value = "/api/scripts/{id}")
    public ResponseEntity<Script> readOne(@PathVariable(name = "id") int id) {

        final Script script = scriptService.getScriptInfo(id);

        return script != null
                ? new ResponseEntity<>(script, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
