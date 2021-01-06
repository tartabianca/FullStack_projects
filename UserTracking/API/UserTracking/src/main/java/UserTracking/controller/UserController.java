package UserTracking.controller;

import UserTracking.dto.UserDTO;
import UserTracking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping()
    public ResponseEntity<List<UserDTO>> getAllUsers() throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> getCurrentUser(@RequestParam("tokenID") String id) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(userService.getCurrentUser(id));
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody() UserDTO userDTO) throws Exception {
        return ResponseEntity.ok(userService.register(userDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody() UserDTO userDTO)  throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(userService.login(userDTO));
    }

    @PutMapping("/update")
    public ResponseEntity<UserDTO> updateUser(@RequestBody() UserDTO user) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteUserById(@RequestParam("tokenID") String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
