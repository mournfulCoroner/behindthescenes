package com.theatre.BehindTheScenes.service;

import com.theatre.BehindTheScenes.dao.ScriptRepository;
import com.theatre.BehindTheScenes.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
public class ScriptService {
    private final ScriptRepository scriptRepository;

    @Autowired
    public ScriptService(ScriptRepository scriptRepository)
    {
        this.scriptRepository = scriptRepository;
    }

    public Script create(Script script) {
        return scriptRepository.save(script);
    }

    public void update(int id, String title, String author) {
        Script script = scriptRepository.findById(id).orElse(null);
        if(script != null){
            script.setTitle(title);
            script.setAuthor(author);
            scriptRepository.save(script);
        }
    }

    public boolean delete(int id) {
        long count = scriptRepository.deleteByIdScript(id);
        return count > 0;
    }

    public List<Script> search(String infix){
        return scriptRepository.findAllByTitleContaining(infix);
    }

    public List<Script> findAll(){
        return scriptRepository.findAll();
    }

    public Script getScriptInfo(int scriptId){
        return scriptRepository.findById(scriptId).orElse(null);
    }

    public List<Replic> getScript(int scriptId){
        List<Role> roles = (List<Role>) Objects.requireNonNull(scriptRepository.findById(scriptId).orElse(null)).getRolesByIdScript();
        List<Replic> replics = new ArrayList<>();
        for(Role role: roles){
            replics.addAll(role.getReplicsByIdRole());
        }
        replics.sort(Comparator.comparingInt(Replic::getReplicNumber));
        return replics;
    }


}
