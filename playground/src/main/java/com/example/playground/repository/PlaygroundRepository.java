package com.example.playground.repository;

import com.example.playground.entity.Playground;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
    public interface PlaygroundRepository extends JpaRepository<Playground, Long> {
//    Playground findByLocation(String location);

    @Query("SELECT p FROM Playground p JOIN p.addresses a WHERE a.city = :city")
    Playground findByLocation(@Param("city") String city);

}
