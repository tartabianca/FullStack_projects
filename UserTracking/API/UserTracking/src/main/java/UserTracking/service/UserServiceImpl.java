package UserTracking.service;

import UserTracking.dto.UserDTO;
import UserTracking.entity.User;
import UserTracking.security.JwtTokenUtil;
import UserTracking.mapper.UserMapper;
import UserTracking.repository.UserRepository;
import UserTracking.security.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtToken;

    public List<UserDTO> getAllUsers() throws ExecutionException, InterruptedException {

        List<User> users = userRepository.findAll();
        List<UserDTO> usersDTO = new ArrayList<>();

        for (User u : users) {
            usersDTO.add(userMapper.entityToDto(u));
        }
        return usersDTO;
    }

    public UserDTO getCurrentUser(String id) throws ExecutionException, InterruptedException {
        UserDTO userDTO = userMapper.entityToDto(userRepository.getById(id));
        return userDTO;

    }

    public UserDTO register(UserDTO userDTO){
        List<Role> roles=userDTO.getRoles();
        roles.add(new Role(1,"user"));
        userDTO.setRoles(roles);
        final String token = jwtToken.generateToken(userDTO);
        userDTO.setTokenID(token);
        User newUser = userRepository.save(userMapper.dtoToEntity(userDTO));
        return userMapper.entityToDto(newUser);
    }

    public UserDTO login(UserDTO userDTO) throws ExecutionException, InterruptedException {
        User user = userRepository.login(userDTO.getEmail(), userDTO.getPassword());
        if (user != null) {
            return userMapper.entityToDto(user);
        } else
            return null;
    }

    public UserDTO updateUser(UserDTO userDTO) throws ExecutionException, InterruptedException {
        User updatedUser = userRepository.update(userMapper.dtoToEntity(userDTO));
        return userMapper.entityToDto(updatedUser);
    }

    public String deleteUser(String id) {
        String message = userRepository.delete(id);
        return message;
    }
}