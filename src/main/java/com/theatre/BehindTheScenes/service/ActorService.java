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
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public Actor update(int id, String name) {
        if(actorRepository.findById(id).isPresent()){
            return actorRepository.save(new Actor(id, name));
        }
        return null;
    }

    @Transactional
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

    public Actor find(int actorId){
        return actorRepository.findById(actorId).orElse(null);
    }

    @Transactional
    public Role addRole(int actorId, int roleId){
        ActorRole actorRole = new ActorRole(actorId, roleId);
        actorRoleRepository.save(actorRole);
        return roleRepository.findById(roleId).orElse(null);
    }

    @Transactional
    public void deleteRole(int actorId, int roleId){
        actorRoleRepository.deleteById(new ActorRolePK(actorId, roleId));
    }

    public List<Role> getRoles(int actorId){
        List<Role> roles = new ArrayList<>();
        Actor actor = actorRepository.findById(actorId).orElse(null);
        if(actor != null){
            List<ActorRole> lst = (List<ActorRole>) actor.getActorRolesByIdActor();
            for(ActorRole actrole: lst){
                roles.add(actrole.getRoleByRoleIdRole());
            }
            return roles;
        }
        return null;
    }
}
