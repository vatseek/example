--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: blogs; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.blogs (
    id integer NOT NULL,
    category_id integer,
    title character varying(255) NOT NULL,
    body text
);


ALTER TABLE public.blogs OWNER TO database;

--
-- Name: blogs_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.blogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.blogs_id_seq OWNER TO database;

--
-- Name: blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.blogs_id_seq OWNED BY public.blogs.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    parent_id integer,
    name character varying(100) NOT NULL,
    slug character varying(100) NOT NULL,
    type text,
    ord integer DEFAULT 0,
    CONSTRAINT categories_type_check CHECK ((type = ANY (ARRAY['0'::text, '1'::text, '2'::text])))
);


ALTER TABLE public.categories OWNER TO database;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO database;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: forums; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.forums (
    id integer NOT NULL,
    category_id integer,
    title character varying(255) NOT NULL,
    body text
);


ALTER TABLE public.forums OWNER TO database;

--
-- Name: forums_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.forums_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.forums_id_seq OWNER TO database;

--
-- Name: forums_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.forums_id_seq OWNED BY public.forums.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO database;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO database;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO database;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO database;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: news; Type: TABLE; Schema: public; Owner: database
--

CREATE TABLE public.news (
    id integer NOT NULL,
    category_id integer,
    title character varying(255) NOT NULL,
    body text
);


ALTER TABLE public.news OWNER TO database;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: database
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.news_id_seq OWNER TO database;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: database
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: blogs id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.blogs ALTER COLUMN id SET DEFAULT nextval('public.blogs_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: forums id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.forums ALTER COLUMN id SET DEFAULT nextval('public.forums_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: forums forums_pkey; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.forums
    ADD CONSTRAINT forums_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);


--
-- Name: categories_slug_index; Type: INDEX; Schema: public; Owner: database
--

CREATE INDEX categories_slug_index ON public.categories USING btree (slug);


--
-- Name: blogs blogs_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_category_id_foreign FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: categories categories_parent_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_foreign FOREIGN KEY (parent_id) REFERENCES public.categories(id);


--
-- Name: forums forums_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.forums
    ADD CONSTRAINT forums_category_id_foreign FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: news news_category_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: database
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_category_id_foreign FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- PostgreSQL database dump complete
--

