-- Fix search_path for all functions to prevent search_path injection attacks

-- Recreate decrement_comments_count with fixed search_path
CREATE OR REPLACE FUNCTION public.decrement_comments_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  UPDATE public.community_posts
  SET comments_count = comments_count - 1
  WHERE id = OLD.post_id;
  RETURN OLD;
END;
$function$;

-- Recreate decrement_likes_count with fixed search_path
CREATE OR REPLACE FUNCTION public.decrement_likes_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  UPDATE public.community_posts
  SET likes_count = likes_count - 1
  WHERE id = OLD.post_id;
  RETURN OLD;
END;
$function$;

-- Recreate delete_old_detection_history with fixed search_path
CREATE OR REPLACE FUNCTION public.delete_old_detection_history()
 RETURNS void
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  DELETE FROM public.detection_history
  WHERE created_at < now() - interval '3 days';
END;
$function$;

-- Recreate increment_comments_count with fixed search_path
CREATE OR REPLACE FUNCTION public.increment_comments_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  UPDATE public.community_posts
  SET comments_count = comments_count + 1
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$function$;

-- Recreate increment_likes_count with fixed search_path
CREATE OR REPLACE FUNCTION public.increment_likes_count()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  UPDATE public.community_posts
  SET likes_count = likes_count + 1
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$function$;

-- Recreate update_updated_at_column with fixed search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;