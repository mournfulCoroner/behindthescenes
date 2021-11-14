package com.theatre.BehindTheScenes.service;

import com.theatre.BehindTheScenes.dao.AuthorityRepository;
import com.theatre.BehindTheScenes.dao.UserAuthorityRepository;
import com.theatre.BehindTheScenes.dao.UserRepository;
import com.theatre.BehindTheScenes.dto.UserDTO;
import com.theatre.BehindTheScenes.model.Authority;
import com.theatre.BehindTheScenes.model.User;
import com.theatre.BehindTheScenes.model.UserAuthority;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
//import java.util.Base64;


@Service
public class UserService {
    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final UserAuthorityRepository userAuthorityRepository;

    @Autowired
    public UserService(UserRepository userRepository, AuthorityRepository authorityRepository,
                       UserAuthorityRepository userAuthorityRepository) {
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.userAuthorityRepository = userAuthorityRepository;
    }

    /**
     * Сохраняет пользователя
     * @param userDTO экземпляр класса UserDTO, в котором должны быть password и nickname
     * @return true если сохранился, иначе false
     */
    public User saveUser(UserDTO userDTO) {

        User user = new User(userDTO.getNickname(), userDTO.getPassword(), User.PASSWORD_ENCODER.encode(userDTO.getPassword()));
        return userRepository.save(user);
    }

    /**
     * переводит имя и пароль пользователя в кодировку Base64
     * @param nickname имя пользователя
     * @param password его пароль
     * @return токен для авторизации (authorization)
     */
    public String codeBase64(String nickname, String password) {
        String auth = nickname + ":" + password;
        byte[] encodedAuth = Base64.encodeBase64(
                auth.getBytes(Charset.forName("US-ASCII")) );
        return "Basic " + new String( encodedAuth );
    }

    /**
     * возращает имя пользователя закодированное в authorization
     * @param authorization токен для авторизации
     * @return имя пользователя
     */
    public String getNameByAuthorization(String authorization) throws UnsupportedEncodingException {
        String code = authorization.replace("Basic ", "");
        return new String(Base64.decodeBase64(code), "US-ASCII").split(":")[0];
    }

    /**
     * возращает объект класса User на основе имени пользователя закодированного в authorization
     * @param authorization токен для авторизации
     * @return экзмепляр класса User
     */
    public User getUserByAuthorization(String authorization) throws UnsupportedEncodingException {
        return userRepository.findByNickname(getNameByAuthorization(authorization));
    }

    public User getUserByUsername(String username){
        return userRepository.findByNickname(username);
    }

    public List<Authority> getUserAuthorities(Integer userId){
        List<Authority> authorities = new ArrayList<>();
        Optional<Authority> author;
        for(UserAuthority auth: userAuthorityRepository.findAllByUserId(userId)){
            author = authorityRepository.findById(auth.getAuthorityId());
            author.ifPresent(authorities::add);
        }
        return authorities;
    }

}
