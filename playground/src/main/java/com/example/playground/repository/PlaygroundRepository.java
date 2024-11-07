package com.example.playground.repository;

import com.example.playground.entity.Playground;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
    public interface PlaygroundRepository extends JpaRepository<Playground, Long> {

    @Query("SELECT p FROM Playground p JOIN p.address a WHERE a.city = :city")
    List<Playground> findByAddress(@Param("city") String city);

    List<Playground> findAllByAddressCity(String city);

}

