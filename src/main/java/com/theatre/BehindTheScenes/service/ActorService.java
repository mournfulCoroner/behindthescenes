package com.theatre.BehindTheScenes.service;

import com.theatre.BehindTheScenes.dao.ActorRepository;
import com.theatre.BehindTheScenes.dao.ActorRoleRepository;
import com.theatre.BehindTheScenes.dao.RoleRepository;
import com.theatre.BehindTheScenes.model.Actor;
import com.theatre.BehindTheScenes.model.ActorRole;
import com.theatre.BehindTheScenes.model.ActorRolePK;
import com.theatre.BehindTheScenes.model.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ActorService {
    private final ActorRepository actorRepository;
    private final ActorRoleRepository actorRoleRepository;
    private final RoleRepository roleRepository;
    
    @Autowired
    public ActorService(ActorRepository actorRepository, ActorRoleRepository actorRoleRepository, RoleRepository roleRepository)
    {
        this.actorRepository = actorRepository;
        this.actorRoleRepository = actorRoleRepository;
        this.roleRepository = roleRepository;
    }

    public Actor create(Actor actor) {
        return actorRepository.save(actor);
    }

    public void update(int id, String name) {
        if(actorRepository.findById(id).isPresent()){
            actorRepository.save(new Actor(id, name));
        }
    }

    public boolean delete(int id) {
        long count = actorRepository.deleteByIdActor(id);
        return count > 0;
    }

    public List<Actor> search(String infix){
        return actorRepository.findAllByNameContaining(infix);
    }

    public List<Actor> findAll(){
        return actorRepository.findAll();
    }

    public void addRole(int actorId, int roleId){
        actorRoleRepository.save(new ActorRole(actorId, roleId));
    }

    public void deleteRole(int actorId, int roleId){
        actorRoleRepository.deleteById(new ActorRolePK(actorId, roleId));
    }

//    public List<Role> getRoles(int actorId){
//        List<ActorRole> lst = actorRoleRepository.findAllByActorIdActor(actorId);
//        List<Role> roles = new ArrayList<>();
//        for(ActorRole actorRole: lst){
//
//        }
//    }
}