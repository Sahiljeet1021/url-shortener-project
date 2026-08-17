package com.url.shortener.repository;

import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ClickEventRepository extends JpaRepository<ClickEvent, Long> {
    //see this naming conevntion of the method .how jpa find meaning from it
    List<ClickEvent> findByUrlMappingAndClickDateBetween(UrlMapping urlMapping, LocalDateTime startDate, LocalDateTime endDate);
    //this method how many clicks particular user has in his account along with time frame
    List<ClickEvent> findByUrlMappingInAndClickDateBetween(List<UrlMapping>urlMappings, LocalDateTime startDate, LocalDateTime endDate);

}
