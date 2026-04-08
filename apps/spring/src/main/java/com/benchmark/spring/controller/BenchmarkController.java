package com.benchmark.spring.controller;

import com.benchmark.spring.entity.User;
import com.benchmark.spring.service.BenchmarkService;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BenchmarkController {

  private final BenchmarkService benchmarkService;

  public BenchmarkController(BenchmarkService benchmarkService) {
    this.benchmarkService = benchmarkService;
  }

  @GetMapping("/health")
  public Map<String, String> health() {
    return benchmarkService.health();
  }

  @GetMapping("/compute")
  public long compute(@RequestParam(defaultValue = "40") int n) {
    return benchmarkService.compute(n);
  }

  @GetMapping("/users")
  public List<User> getUsers() {
    return benchmarkService.getUsersOrm();
  }

  @GetMapping("/users/raw")
  public List<Map<String, Object>> getUsersRaw() {
    return benchmarkService.getUsersRaw();
  }

  @PostMapping("/users")
  public User createUser(@RequestBody User user) {
    return benchmarkService.createUser(user);
  }
}
