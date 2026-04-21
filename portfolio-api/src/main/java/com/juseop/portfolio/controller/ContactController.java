package com.juseop.portfolio.controller;

import com.juseop.portfolio.dto.ContactDto;
import com.juseop.portfolio.mapper.ContactMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactMapper contactMapper;

    @PostMapping
    public ResponseEntity<Map<String, String>> sendMessage(@Valid @RequestBody ContactDto dto) {
        contactMapper.insert(dto);
        return ResponseEntity.ok(Map.of("message", "메시지가 전송되었습니다."));
    }
}
