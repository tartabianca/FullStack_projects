package UserTracking.controller;

import UserTracking.dto.UserDTO;
import UserTracking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/getAllUsers")
    public List<UserDTO> getAllUsers() throws ExecutionException, InterruptedException {
        return userService.getAllUsers();
    }

    @GetMapping("/me")
    public UserDTO getCurrentUser(@RequestParam("tokenID") String id) throws ExecutionException, InterruptedException {
        return userService.getCurrentUser(id);
    }

    @PostMapping("/register")
    public UserDTO register(@RequestBody() UserDTO userDTO) throws Exception {
        return userService.register(userDTO);
    }

    @PostMapping("/login")
    public UserDTO login(@RequestBody() UserDTO userDTO)  throws ExecutionException, InterruptedException {
        return userService.login(userDTO);
    }

    @PutMapping("/updateUser")
    public UserDTO updateUser(@RequestBody() UserDTO user) throws ExecutionException, InterruptedException {
        return userService.updateUser(user);
    }

    @DeleteMapping("/deleteUser")
    public String deleteUserById(@RequestParam("tokenID") String id) {
        return userService.deleteUser(id);
    }
}
