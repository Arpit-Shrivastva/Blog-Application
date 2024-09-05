package com.blogapp.Blog_Backend.Controller;


import com.blogapp.Blog_Backend.Model.User;
import com.blogapp.Blog_Backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"*"}, maxAge = 4800, allowCredentials = "false")
@RequestMapping("/api/v1/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(user));
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUser());
    }

    @DeleteMapping("/{email}")
    public ResponseEntity<?> deletUser(@PathVariable String email) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.deleteUser(email));
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUserByName(@PathVariable String email) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserByEmail(email));
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody String email, String password) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserByEmailAndPassword(email, password));
    }

}
