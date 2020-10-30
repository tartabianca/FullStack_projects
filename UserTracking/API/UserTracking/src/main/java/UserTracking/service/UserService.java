package UserTracking.service;

import UserTracking.dto.UserDTO;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface UserService {

    List<UserDTO> getAllUsers() throws ExecutionException, InterruptedException;

    UserDTO getCurrentUser(String id) throws ExecutionException, InterruptedException;

    UserDTO register(UserDTO userDTO) throws Exception;

    UserDTO login(UserDTO userDTO) throws ExecutionException, InterruptedException;

    UserDTO updateUser(UserDTO userDTO) throws ExecutionException, InterruptedException;

    String deleteUser(String id);

}
