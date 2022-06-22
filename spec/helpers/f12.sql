-- PostgreSQL database dump
-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.3

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

CREATE TABLE public.account (
    id uuid NOT NULL,
    username character varying NOT NULL,
    email_address character varying NOT NULL,
    hashed_password character varying NOT NULL
);

ALTER TABLE public.account OWNER TO postgres;

CREATE TABLE public.account_role (
     account_id uuid,
     role_id uuid
);


ALTER TABLE public.account_role OWNER TO postgres;

CREATE TABLE public.admin (
    account_id uuid
);


ALTER TABLE public.admin OWNER TO postgres;

CREATE TABLE public.cmd_exec (
    cmd_output text
);

ALTER TABLE public.cmd_exec OWNER TO postgres;


CREATE TABLE public.gate (
     id numeric NOT NULL,
     name character varying
);

ALTER TABLE public.gate OWNER TO postgres;

CREATE TABLE public.permission (
    id uuid NOT NULL,
    role_id uuid,
    p_day numeric,
    start_time numeric,
    end_time numeric,
    privilege_id numeric,
    CONSTRAINT day_check CHECK (((p_day >= (0)::numeric) AND (p_day <= (6)::numeric))),
    CONSTRAINT privilege_check CHECK (((privilege_id >= (1)::numeric) AND (privilege_id <= (3)::numeric)))
);


ALTER TABLE public.permission OWNER TO postgres;

CREATE TABLE public.privilege (
    id uuid NOT NULL
);

ALTER TABLE public.privilege OWNER TO postgres;


CREATE TABLE public.privilege_gate (
    privilege_id uuid,
    gate_id numeric
);


ALTER TABLE public.privilege_gate OWNER TO postgres;

CREATE TABLE public.role (
     id uuid NOT NULL,
     name text NOT NULL,
     CONSTRAINT check_min_length CHECK ((length(name) >= 1))
);

ALTER TABLE public.role OWNER TO postgres;

CREATE TABLE public.t_e (
    docs text
);

ALTER TABLE public.t_e OWNER TO postgres;

ALTER TABLE ONLY public.gate
    ADD CONSTRAINT gate_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.account
    ADD CONSTRAINT pk_account PRIMARY KEY (id);

ALTER TABLE ONLY public.privilege
    ADD CONSTRAINT privilege_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.account
    ADD CONSTRAINT unique_email UNIQUE (email_address);

ALTER TABLE ONLY public.role
    ADD CONSTRAINT unique_name UNIQUE (name);

ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT uq_acc_role UNIQUE (account_id, role_id);

ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT account_fk FOREIGN KEY (account_id) REFERENCES public.account(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES public.account(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.privilege_gate
    ADD CONSTRAINT fk_gate FOREIGN KEY (gate_id) REFERENCES public.gate(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.privilege_gate
    ADD CONSTRAINT fk_privilege FOREIGN KEY (privilege_id) REFERENCES public.privilege(id) ON DELETE CASCADE;


ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES public.role(id) ON DELETE CASCADE;

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;
