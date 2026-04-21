package com.juseop.portfolio.mapper;

import com.juseop.portfolio.dto.ContactDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ContactMapper {
    void insert(ContactDto dto);
}
