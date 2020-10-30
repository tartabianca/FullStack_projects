package UserTracking.mapper;

import UserTracking.dto.UserDTO;
import UserTracking.entity.User;
import org.springframework.stereotype.Component;


@Component
public class UserMapper {

    public UserDTO entityToDto(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setTokenID(user.getTokenID());
        userDTO.setFirstname(user.getFirstname());
        userDTO.setLastname(user.getLastname());
        userDTO.setEmail(user.getEmail());
        userDTO.setPassword(user.getPassword());
        userDTO.setRoles(user.getRoles());
        return userDTO;
    }

    public User dtoToEntity(UserDTO userDTO) {
        User user = new User();
        user.setTokenID(userDTO.getTokenID());
        user.setFirstname(userDTO.getFirstname());
        user.setLastname(userDTO.getLastname());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setRoles(userDTO.getRoles());
        return user;
    }
}
