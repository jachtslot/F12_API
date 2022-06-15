DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.3

-- Started on 2022-06-15 14:46:12 CEST

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

--
-- TOC entry 209 (class 1259 OID 16405)
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
                                id uuid NOT NULL,
                                username character varying NOT NULL,
                                email_address character varying NOT NULL,
                                hashed_password character varying NOT NULL
);


ALTER TABLE public.account OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24587)
-- Name: account_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account_role (
                                     account_id uuid,
                                     role_id uuid
);


ALTER TABLE public.account_role OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24603)
-- Name: admin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admin (
    account_id uuid
);


ALTER TABLE public.admin OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16536)
-- Name: cmd_exec; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cmd_exec (
    cmd_output text
);


ALTER TABLE public.cmd_exec OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16438)
-- Name: gate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.gate (
                             id numeric NOT NULL,
                             name character varying
);


ALTER TABLE public.gate OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16477)
-- Name: permission; Type: TABLE; Schema: public; Owner: postgres
--

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

--
-- TOC entry 213 (class 1259 OID 16448)
-- Name: privilege; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.privilege (
    id uuid NOT NULL
);


ALTER TABLE public.privilege OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16461)
-- Name: privilege_gate; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.privilege_gate (
                                       privilege_id uuid,
                                       gate_id numeric
);


ALTER TABLE public.privilege_gate OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16410)
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
                             id uuid NOT NULL,
                             name text NOT NULL,
                             CONSTRAINT check_min_length CHECK ((length(name) >= 1))
);


ALTER TABLE public.role OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16426)
-- Name: t_e; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t_e (
    docs text
);


ALTER TABLE public.t_e OWNER TO postgres;

--
-- TOC entry 4281 (class 0 OID 16405)
-- Dependencies: 209
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- TOC entry 4129 (class 2606 OID 16444)
-- Name: gate gate_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.gate
    ADD CONSTRAINT gate_pkey PRIMARY KEY (id);


--
-- TOC entry 4133 (class 2606 OID 16485)
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- TOC entry 4121 (class 2606 OID 16425)
-- Name: account pk_account; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT pk_account PRIMARY KEY (id);


--
-- TOC entry 4131 (class 2606 OID 16452)
-- Name: privilege privilege_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.privilege
    ADD CONSTRAINT privilege_pkey PRIMARY KEY (id);


--
-- TOC entry 4125 (class 2606 OID 16416)
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- TOC entry 4123 (class 2606 OID 16535)
-- Name: account unique_email; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT unique_email UNIQUE (email_address);


--
-- TOC entry 4127 (class 2606 OID 16542)
-- Name: role unique_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT unique_name UNIQUE (name);


--
-- TOC entry 4135 (class 2606 OID 24601)
-- Name: account_role uq_acc_role; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT uq_acc_role UNIQUE (account_id, role_id);


--
-- TOC entry 4139 (class 2606 OID 24590)
-- Name: account_role account_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT account_fk FOREIGN KEY (account_id) REFERENCES public.account(id) ON DELETE CASCADE;


--
-- TOC entry 4141 (class 2606 OID 24606)
-- Name: admin fk_account_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT fk_account_id FOREIGN KEY (account_id) REFERENCES public.account(id) ON DELETE CASCADE;


--
-- TOC entry 4137 (class 2606 OID 16528)
-- Name: privilege_gate fk_gate; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.privilege_gate
    ADD CONSTRAINT fk_gate FOREIGN KEY (gate_id) REFERENCES public.gate(id) ON DELETE CASCADE;


--
-- TOC entry 4136 (class 2606 OID 16523)
-- Name: privilege_gate fk_privilege; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.privilege_gate
    ADD CONSTRAINT fk_privilege FOREIGN KEY (privilege_id) REFERENCES public.privilege(id) ON DELETE CASCADE;


--
-- TOC entry 4138 (class 2606 OID 16508)
-- Name: permission permission_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.role(id) ON DELETE CASCADE;


--
-- TOC entry 4140 (class 2606 OID 24595)
-- Name: account_role role_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account_role
    ADD CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES public.role(id) ON DELETE CASCADE;


--
-- TOC entry 4296 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2022-06-15 14:46:17 CEST

--
-- PostgreSQL database dump complete
--
