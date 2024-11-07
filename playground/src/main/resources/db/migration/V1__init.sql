CREATE TABLE address
(
    id    BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    city  VARCHAR(255),
    state VARCHAR(255),
    zip   VARCHAR(255),
    CONSTRAINT pk_address PRIMARY KEY (id)
);

CREATE TABLE playground
(
    id           BIGINT GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    location     VARCHAR(255),
    description  VARCHAR(255),
    rating       INTEGER                                 NOT NULL,
    feedback     VARCHAR(255),
    date         TIMESTAMP WITHOUT TIME ZONE,
    address_id BIGINT NOT NULL,
    CONSTRAINT pk_playground PRIMARY KEY (id)
);

ALTER TABLE playground
    ADD CONSTRAINT FK_ADDRESSID__ON_ADDRESS FOREIGN KEY (address_id) REFERENCES Address(id);
