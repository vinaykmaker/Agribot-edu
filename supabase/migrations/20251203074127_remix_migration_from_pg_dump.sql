CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: decrement_comments_count(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.decrement_comments_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE public.community_posts
  SET comments_count = comments_count - 1
  WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$;


--
-- Name: decrement_likes_count(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.decrement_likes_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE public.community_posts
  SET likes_count = likes_count - 1
  WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$;


--
-- Name: delete_old_detection_history(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.delete_old_detection_history() RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  DELETE FROM public.detection_history
  WHERE created_at < now() - interval '3 days';
END;
$$;


--
-- Name: increment_comments_count(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.increment_comments_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE public.community_posts
  SET comments_count = comments_count + 1
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$;


--
-- Name: increment_likes_count(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.increment_likes_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE public.community_posts
  SET likes_count = likes_count + 1
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: community_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.community_comments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    post_id uuid NOT NULL,
    user_id uuid NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: community_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.community_likes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    post_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: community_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.community_posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    image_url text NOT NULL,
    crop_type text,
    issue_detected text,
    solutions text,
    status text DEFAULT 'pending'::text NOT NULL,
    moderation_note text,
    likes_count integer DEFAULT 0 NOT NULL,
    comments_count integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT community_posts_status_check CHECK ((status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text])))
);


--
-- Name: detection_history; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.detection_history (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    image_url text NOT NULL,
    detection_result jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: community_comments community_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_comments
    ADD CONSTRAINT community_comments_pkey PRIMARY KEY (id);


--
-- Name: community_likes community_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_likes
    ADD CONSTRAINT community_likes_pkey PRIMARY KEY (id);


--
-- Name: community_likes community_likes_post_id_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_likes
    ADD CONSTRAINT community_likes_post_id_user_id_key UNIQUE (post_id, user_id);


--
-- Name: community_posts community_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_posts
    ADD CONSTRAINT community_posts_pkey PRIMARY KEY (id);


--
-- Name: detection_history detection_history_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detection_history
    ADD CONSTRAINT detection_history_pkey PRIMARY KEY (id);


--
-- Name: idx_community_comments_post_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_community_comments_post_id ON public.community_comments USING btree (post_id);


--
-- Name: idx_community_posts_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_community_posts_created_at ON public.community_posts USING btree (created_at DESC);


--
-- Name: idx_community_posts_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_community_posts_status ON public.community_posts USING btree (status);


--
-- Name: idx_detection_history_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_detection_history_created_at ON public.detection_history USING btree (created_at);


--
-- Name: community_comments decrement_comments_count_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER decrement_comments_count_trigger AFTER DELETE ON public.community_comments FOR EACH ROW EXECUTE FUNCTION public.decrement_comments_count();


--
-- Name: community_likes decrement_likes_count_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER decrement_likes_count_trigger AFTER DELETE ON public.community_likes FOR EACH ROW EXECUTE FUNCTION public.decrement_likes_count();


--
-- Name: community_comments increment_comments_count_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER increment_comments_count_trigger AFTER INSERT ON public.community_comments FOR EACH ROW EXECUTE FUNCTION public.increment_comments_count();


--
-- Name: community_likes increment_likes_count_trigger; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER increment_likes_count_trigger AFTER INSERT ON public.community_likes FOR EACH ROW EXECUTE FUNCTION public.increment_likes_count();


--
-- Name: community_posts update_community_posts_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON public.community_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: community_comments community_comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_comments
    ADD CONSTRAINT community_comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.community_posts(id) ON DELETE CASCADE;


--
-- Name: community_comments community_comments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_comments
    ADD CONSTRAINT community_comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: community_likes community_likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_likes
    ADD CONSTRAINT community_likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.community_posts(id) ON DELETE CASCADE;


--
-- Name: community_likes community_likes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_likes
    ADD CONSTRAINT community_likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: community_posts community_posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.community_posts
    ADD CONSTRAINT community_posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: detection_history detection_history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.detection_history
    ADD CONSTRAINT detection_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: community_posts Anyone can view approved posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view approved posts" ON public.community_posts FOR SELECT USING ((status = 'approved'::text));


--
-- Name: community_comments Anyone can view comments on approved posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view comments on approved posts" ON public.community_comments FOR SELECT USING ((EXISTS ( SELECT 1
   FROM public.community_posts
  WHERE ((community_posts.id = community_comments.post_id) AND (community_posts.status = 'approved'::text)))));


--
-- Name: community_likes Anyone can view likes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view likes" ON public.community_likes FOR SELECT USING (true);


--
-- Name: community_comments Authenticated users can create comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create comments" ON public.community_comments FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: community_likes Authenticated users can create likes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create likes" ON public.community_likes FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: community_posts Authenticated users can create posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create posts" ON public.community_posts FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: community_comments Users can delete their own comments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own comments" ON public.community_comments FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: detection_history Users can delete their own detection history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own detection history" ON public.detection_history FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: community_likes Users can delete their own likes; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own likes" ON public.community_likes FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: community_posts Users can delete their own posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own posts" ON public.community_posts FOR DELETE USING ((auth.uid() = user_id));


--
-- Name: detection_history Users can insert their own detection history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert their own detection history" ON public.detection_history FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: community_posts Users can update their own posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own posts" ON public.community_posts FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: detection_history Users can view their own detection history; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own detection history" ON public.detection_history FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: community_posts Users can view their own posts; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own posts" ON public.community_posts FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: community_comments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.community_comments ENABLE ROW LEVEL SECURITY;

--
-- Name: community_likes; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.community_likes ENABLE ROW LEVEL SECURITY;

--
-- Name: community_posts; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

--
-- Name: detection_history; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.detection_history ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


