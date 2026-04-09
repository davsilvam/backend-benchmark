package com.benchmark.spring.service;

import com.benchmark.spring.entity.User;
import com.benchmark.spring.repository.UserRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class BenchmarkService {

  private final UserRepository userRepository;
  private final JdbcTemplate jdbcTemplate;

  public BenchmarkService(
    UserRepository userRepository,
    JdbcTemplate jdbcTemplate
  ) {
    this.userRepository = userRepository;
    this.jdbcTemplate = jdbcTemplate;
  }

  public Map<String, String> health() {
    return Map.of("status", "ok");
  }

  public long compute(int n) {
    return fib(n);
  }

  private long fib(int n) {
    if (n <= 1) {
      return n;
    }
    return fib(n - 1) + fib(n - 2);
  }

  public List<User> getUsersOrm() {
    return userRepository
      .findAll(PageRequest.of(0, 1000, Sort.by(Sort.Direction.ASC, "id")))
      .getContent();
  }

  public User createUser(User user) {
    if (user.getCreatedAt() == null) {
      user.setCreatedAt(LocalDateTime.now());
    }
    return userRepository.save(user);
  }

  public List<Map<String, Object>> getUsersRaw() {
    return jdbcTemplate.query(
      "SELECT id, name, email, created_at FROM users ORDER BY id LIMIT 1000",
      (rs, rowNum) ->
        Map.<String, Object>of(
          "id",
          rs.getLong("id"),
          "name",
          rs.getString("name"),
          "email",
          rs.getString("email"),
          "created_at",
          rs.getTimestamp("created_at").toLocalDateTime()
        )
    );
  }

  public int countUsersRaw() {
    Integer count = jdbcTemplate.queryForObject(
      "SELECT COUNT(*) FROM users",
      Integer.class
    );
    return count != null ? count : 0;
  }
}
