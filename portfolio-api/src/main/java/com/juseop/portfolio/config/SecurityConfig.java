package com.juseop.portfolio.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // 공개 GET API
                .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                // 인터랙션 POST (조회수, 좋아요, 댓글, 연락폼)
                .requestMatchers(HttpMethod.POST,
                    "/api/posts/*/views",
                    "/api/posts/*/likes",
                    "/api/posts/*/comments",
                    "/api/contact"
                ).permitAll()
                // actuator 헬스체크
                .requestMatchers("/actuator/health").permitAll()
                // 나머지는 인증 필요
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
