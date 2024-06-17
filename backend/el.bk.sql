PGDMP  	                     |            el.bk    10.22    16.2 U    c           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            d           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            e           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            f           1262    25709    el.bk    DATABASE     {   CREATE DATABASE "el.bk" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "el.bk";
                postgres    false                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            g           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    6            �            1255    25806    insert_into_authentication()    FUNCTION     �   CREATE FUNCTION public.insert_into_authentication() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO authentication (email, password, role)
    VALUES (NEW.email, NEW.password, TG_ARGV[0]);
    RETURN NEW;
END;
$$;
 3   DROP FUNCTION public.insert_into_authentication();
       public          postgres    false    6            �            1259    25755    admins    TABLE     .  CREATE TABLE public.admins (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    surname character varying(50) NOT NULL,
    middle_name character varying(50),
    email character varying(100) NOT NULL,
    phone character varying(20),
    password character varying(255) NOT NULL
);
    DROP TABLE public.admins;
       public            postgres    false    6            �            1259    25753    admins_id_seq    SEQUENCE     �   CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.admins_id_seq;
       public          postgres    false    6    203            h           0    0    admins_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;
          public          postgres    false    202            �            1259    25843    assessments    TABLE     f   CREATE TABLE public.assessments (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);
    DROP TABLE public.assessments;
       public            postgres    false    6            �            1259    25841    assessments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.assessments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.assessments_id_seq;
       public          postgres    false    213    6            i           0    0    assessments_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.assessments_id_seq OWNED BY public.assessments.id;
          public          postgres    false    212            �            1259    25798    authentication    TABLE     �   CREATE TABLE public.authentication (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(20) NOT NULL
);
 "   DROP TABLE public.authentication;
       public            postgres    false    6            �            1259    25796    authentication_id_seq    SEQUENCE     �   CREATE SEQUENCE public.authentication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.authentication_id_seq;
       public          postgres    false    209    6            j           0    0    authentication_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.authentication_id_seq OWNED BY public.authentication.id;
          public          postgres    false    208            �            1259    25768    disciplines    TABLE     }   CREATE TABLE public.disciplines (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text
);
    DROP TABLE public.disciplines;
       public            postgres    false    6            �            1259    25766    disciplines_id_seq    SEQUENCE     �   CREATE SEQUENCE public.disciplines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.disciplines_id_seq;
       public          postgres    false    205    6            k           0    0    disciplines_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.disciplines_id_seq OWNED BY public.disciplines.id;
          public          postgres    false    204            �            1259    25779    grades    TABLE     '  CREATE TABLE public.grades (
    id integer NOT NULL,
    student_id integer NOT NULL,
    discipline_id integer NOT NULL,
    grade integer,
    date date NOT NULL,
    semester_id integer,
    assessment_id integer,
    CONSTRAINT grades_grade_check CHECK (((grade >= 2) AND (grade <= 5)))
);
    DROP TABLE public.grades;
       public            postgres    false    6            �            1259    25777    grades_id_seq    SEQUENCE     �   CREATE SEQUENCE public.grades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.grades_id_seq;
       public          postgres    false    207    6            l           0    0    grades_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.grades_id_seq OWNED BY public.grades.id;
          public          postgres    false    206            �            1259    25714    groups    TABLE     a   CREATE TABLE public.groups (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);
    DROP TABLE public.groups;
       public            postgres    false    6            �            1259    25712    groups_id_seq    SEQUENCE     �   CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.groups_id_seq;
       public          postgres    false    6    197            m           0    0    groups_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;
          public          postgres    false    196            �            1259    25812 	   semesters    TABLE     �   CREATE TABLE public.semesters (
    id integer NOT NULL,
    number integer,
    CONSTRAINT semesters_number_check CHECK (((number >= 1) AND (number <= 8)))
);
    DROP TABLE public.semesters;
       public            postgres    false    6            �            1259    25810    semesters_id_seq    SEQUENCE     �   CREATE SEQUENCE public.semesters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.semesters_id_seq;
       public          postgres    false    6    211            n           0    0    semesters_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.semesters_id_seq OWNED BY public.semesters.id;
          public          postgres    false    210            �            1259    25724    students    TABLE     W  CREATE TABLE public.students (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    surname character varying(50) NOT NULL,
    middle_name character varying(50),
    email character varying(100) NOT NULL,
    phone character varying(20),
    group_id integer,
    photo bytea,
    password character varying(255) NOT NULL
);
    DROP TABLE public.students;
       public            postgres    false    6            �            1259    25722    students_id_seq    SEQUENCE     �   CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.students_id_seq;
       public          postgres    false    6    199            o           0    0    students_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;
          public          postgres    false    198            �            1259    25742    teachers    TABLE     g  CREATE TABLE public.teachers (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    surname character varying(50) NOT NULL,
    middle_name character varying(50),
    email character varying(100) NOT NULL,
    phone character varying(20),
    "position" character varying(50),
    photo bytea,
    password character varying(255) NOT NULL
);
    DROP TABLE public.teachers;
       public            postgres    false    6            �            1259    25740    teachers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.teachers_id_seq;
       public          postgres    false    6    201            p           0    0    teachers_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;
          public          postgres    false    200            �
           2604    25758 	   admins id    DEFAULT     f   ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);
 8   ALTER TABLE public.admins ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            �
           2604    25846    assessments id    DEFAULT     p   ALTER TABLE ONLY public.assessments ALTER COLUMN id SET DEFAULT nextval('public.assessments_id_seq'::regclass);
 =   ALTER TABLE public.assessments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212    213            �
           2604    25801    authentication id    DEFAULT     v   ALTER TABLE ONLY public.authentication ALTER COLUMN id SET DEFAULT nextval('public.authentication_id_seq'::regclass);
 @   ALTER TABLE public.authentication ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            �
           2604    25771    disciplines id    DEFAULT     p   ALTER TABLE ONLY public.disciplines ALTER COLUMN id SET DEFAULT nextval('public.disciplines_id_seq'::regclass);
 =   ALTER TABLE public.disciplines ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �
           2604    25782 	   grades id    DEFAULT     f   ALTER TABLE ONLY public.grades ALTER COLUMN id SET DEFAULT nextval('public.grades_id_seq'::regclass);
 8   ALTER TABLE public.grades ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �
           2604    25717 	   groups id    DEFAULT     f   ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);
 8   ALTER TABLE public.groups ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    197    196    197            �
           2604    25815    semesters id    DEFAULT     l   ALTER TABLE ONLY public.semesters ALTER COLUMN id SET DEFAULT nextval('public.semesters_id_seq'::regclass);
 ;   ALTER TABLE public.semesters ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    211    211            �
           2604    25727    students id    DEFAULT     j   ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);
 :   ALTER TABLE public.students ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    198    199    199            �
           2604    25745    teachers id    DEFAULT     j   ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);
 :   ALTER TABLE public.teachers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            V          0    25755    admins 
   TABLE DATA           X   COPY public.admins (id, name, surname, middle_name, email, phone, password) FROM stdin;
    public          postgres    false    203   a       `          0    25843    assessments 
   TABLE DATA           /   COPY public.assessments (id, name) FROM stdin;
    public          postgres    false    213   [a       \          0    25798    authentication 
   TABLE DATA           C   COPY public.authentication (id, email, password, role) FROM stdin;
    public          postgres    false    209   �a       X          0    25768    disciplines 
   TABLE DATA           <   COPY public.disciplines (id, name, description) FROM stdin;
    public          postgres    false    205   �b       Z          0    25779    grades 
   TABLE DATA           h   COPY public.grades (id, student_id, discipline_id, grade, date, semester_id, assessment_id) FROM stdin;
    public          postgres    false    207   c       P          0    25714    groups 
   TABLE DATA           *   COPY public.groups (id, name) FROM stdin;
    public          postgres    false    197   {c       ^          0    25812 	   semesters 
   TABLE DATA           /   COPY public.semesters (id, number) FROM stdin;
    public          postgres    false    211   �c       R          0    25724    students 
   TABLE DATA           k   COPY public.students (id, name, surname, middle_name, email, phone, group_id, photo, password) FROM stdin;
    public          postgres    false    199   �c       T          0    25742    teachers 
   TABLE DATA           m   COPY public.teachers (id, name, surname, middle_name, email, phone, "position", photo, password) FROM stdin;
    public          postgres    false    201   vd       q           0    0    admins_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.admins_id_seq', 18, true);
          public          postgres    false    202            r           0    0    assessments_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.assessments_id_seq', 6, true);
          public          postgres    false    212            s           0    0    authentication_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.authentication_id_seq', 58, true);
          public          postgres    false    208            t           0    0    disciplines_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.disciplines_id_seq', 13, true);
          public          postgres    false    204            u           0    0    grades_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.grades_id_seq', 79, true);
          public          postgres    false    206            v           0    0    groups_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.groups_id_seq', 38, true);
          public          postgres    false    196            w           0    0    semesters_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.semesters_id_seq', 8, true);
          public          postgres    false    210            x           0    0    students_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.students_id_seq', 50, true);
          public          postgres    false    198            y           0    0    teachers_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.teachers_id_seq', 4, true);
          public          postgres    false    200            �
           2606    25765    admins admins_email_key 
   CONSTRAINT     S   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_email_key UNIQUE (email);
 A   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_email_key;
       public            postgres    false    203            �
           2606    25763    admins admins_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.admins DROP CONSTRAINT admins_pkey;
       public            postgres    false    203            �
           2606    25850     assessments assessments_name_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_name_key UNIQUE (name);
 J   ALTER TABLE ONLY public.assessments DROP CONSTRAINT assessments_name_key;
       public            postgres    false    213            �
           2606    25848    assessments assessments_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.assessments DROP CONSTRAINT assessments_pkey;
       public            postgres    false    213            �
           2606    25805 '   authentication authentication_email_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.authentication
    ADD CONSTRAINT authentication_email_key UNIQUE (email);
 Q   ALTER TABLE ONLY public.authentication DROP CONSTRAINT authentication_email_key;
       public            postgres    false    209            �
           2606    25803 "   authentication authentication_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.authentication
    ADD CONSTRAINT authentication_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.authentication DROP CONSTRAINT authentication_pkey;
       public            postgres    false    209            �
           2606    25776    disciplines disciplines_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.disciplines
    ADD CONSTRAINT disciplines_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.disciplines DROP CONSTRAINT disciplines_pkey;
       public            postgres    false    205            �
           2606    25785    grades grades_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.grades DROP CONSTRAINT grades_pkey;
       public            postgres    false    207            �
           2606    25721    groups groups_name_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_name_key UNIQUE (name);
 @   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_name_key;
       public            postgres    false    197            �
           2606    25719    groups groups_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.groups DROP CONSTRAINT groups_pkey;
       public            postgres    false    197            �
           2606    25820    semesters semesters_number_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.semesters
    ADD CONSTRAINT semesters_number_key UNIQUE (number);
 H   ALTER TABLE ONLY public.semesters DROP CONSTRAINT semesters_number_key;
       public            postgres    false    211            �
           2606    25818    semesters semesters_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.semesters
    ADD CONSTRAINT semesters_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.semesters DROP CONSTRAINT semesters_pkey;
       public            postgres    false    211            �
           2606    25734    students students_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.students DROP CONSTRAINT students_email_key;
       public            postgres    false    199            �
           2606    25732    students students_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public            postgres    false    199            �
           2606    25752    teachers teachers_email_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_email_key UNIQUE (email);
 E   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teachers_email_key;
       public            postgres    false    201            �
           2606    25750    teachers teachers_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.teachers DROP CONSTRAINT teachers_pkey;
       public            postgres    false    201            �
           2620    25809    admins admins_after_insert    TRIGGER     �   CREATE TRIGGER admins_after_insert AFTER INSERT ON public.admins FOR EACH ROW EXECUTE PROCEDURE public.insert_into_authentication('admin');
 3   DROP TRIGGER admins_after_insert ON public.admins;
       public          postgres    false    214    203            �
           2620    25807    students students_after_insert    TRIGGER     �   CREATE TRIGGER students_after_insert AFTER INSERT ON public.students FOR EACH ROW EXECUTE PROCEDURE public.insert_into_authentication('student');
 7   DROP TRIGGER students_after_insert ON public.students;
       public          postgres    false    199    214            �
           2620    25808    teachers teachers_after_insert    TRIGGER     �   CREATE TRIGGER teachers_after_insert AFTER INSERT ON public.teachers FOR EACH ROW EXECUTE PROCEDURE public.insert_into_authentication('teacher');
 7   DROP TRIGGER teachers_after_insert ON public.teachers;
       public          postgres    false    214    201            �
           2606    25851    grades fk_assessment    FK CONSTRAINT        ALTER TABLE ONLY public.grades
    ADD CONSTRAINT fk_assessment FOREIGN KEY (assessment_id) REFERENCES public.assessments(id);
 >   ALTER TABLE ONLY public.grades DROP CONSTRAINT fk_assessment;
       public          postgres    false    2765    213    207            �
           2606    25735    students fk_group    FK CONSTRAINT     r   ALTER TABLE ONLY public.students
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES public.groups(id);
 ;   ALTER TABLE ONLY public.students DROP CONSTRAINT fk_group;
       public          postgres    false    2737    197    199            �
           2606    25821    grades fk_semester    FK CONSTRAINT     y   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT fk_semester FOREIGN KEY (semester_id) REFERENCES public.semesters(id);
 <   ALTER TABLE ONLY public.grades DROP CONSTRAINT fk_semester;
       public          postgres    false    211    2761    207            �
           2606    25791     grades grades_discipline_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_discipline_id_fkey FOREIGN KEY (discipline_id) REFERENCES public.disciplines(id);
 J   ALTER TABLE ONLY public.grades DROP CONSTRAINT grades_discipline_id_fkey;
       public          postgres    false    207    205    2751            �
           2606    25786    grades grades_student_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id);
 G   ALTER TABLE ONLY public.grades DROP CONSTRAINT grades_student_id_fkey;
       public          postgres    false    199    207    2741            V   D   x�3�tL��̃��e0:39�3�tH�H�-�I�K���477��������$���s��qqq ,d      `   �   x�m�K
�@D�ӧ�R7��s3&A"�=E+&ьW���ݢ �_Q��i��-+).hٰ1�H�1��8C1��_�,p��ܽ/�`d���w��o��{m,�?J��aRB����8�f������8!���j""O�ƈ+      \   �   x�u��
�0E�3SHl�K?��Ќ�hLb���R(w5�3��`.�C��\|q7�RZ�X�O��۲Ϩ!r��7��/,�p�j3��`��{��P���o������n�_4gP5m����i�C�/ȷW�      X   y   x�3�0��M�^��w\�ua��_l���ڪ d����V��C�b˅}.��2⼰(��6��[��w �����@�� .c��.�W00�30�0��d����� 9�ei      Z   Y   x�U���0�f�`BHw��s�����g1�AW�Z0I�h>u�2�V|a��,������c�j��n��}�[���H	�%"/���      P   #   x�3�t4�2�t2�2�42�0�����b���� [�:      ^   *   x���  ��w;�w�ø�&�m&��X��k��[�V5�      R   ~   x�3��,K��eP*39�3�rH�H�-�I�K���4426153��4�4���,H,..�/J�sq���	�1
dL��b����������!��1@��L�b0h�5�2�Z�`1C�=... ?�2�      T   �   x�u�K
�0�דSx�B�k{�v3�Q�m��Z���L(.\�����p8P:�c5*͗���t�y�[��G�l��s.��R�>��;��D��ґ���c��PZ�9��J���?�J)��1��jδ��CiÆ�1���D�     