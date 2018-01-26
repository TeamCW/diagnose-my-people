-- create database named diagnose_my_people --

CREATE TABLE "catagory" (
	"id" serial NOT NULL,
	"kpi" varchar NOT NULL,
	CONSTRAINT catagory_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" varchar NOT NULL,
	"kpi_id" integer NOT NULL,
	"style_id" integer NOT NULL,
	CONSTRAINT questions_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"id" serial NOT NULL,
	"username" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	CONSTRAINT users_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "possible_responses" (
	"id" serial NOT NULL,
	"question_id" integer NOT NULL,
	"response_text" varchar NOT NULL,
	"style_id" integer NOT NULL,
	CONSTRAINT possible_responses_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "question_styles" (
	"id" serial NOT NULL,
	"display_style_type" varchar NOT NULL,
	CONSTRAINT question_styles_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "response_style" (
	"id" serial NOT NULL,
	"display_style_type" varchar NOT NULL,
	CONSTRAINT response_style_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "employee_results" (
	"id" serial NOT NULL,
	"client_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"response_id" integer,
	"response_from_input" varchar,
	CONSTRAINT employee_results_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "selected_kpi" (
	"id" serial NOT NULL,
	"client_id" integer NOT NULL,
	"kpi_id" integer NOT NULL,
	"notes_added" varchar,
	CONSTRAINT selected_kpi_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "client" (
	"id" serial NOT NULL,
	"point_of_contact" varchar NOT NULL,
	"contact_email" varchar NOT NULL,
	"organization" varchar,
	"survey_hash" varchar UNIQUE,
	"contact_number" varchar,
	"position" varchar,
	"status" varchar NOT NULL DEFAULT 'newClient',
	CONSTRAINT client_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("kpi_id") REFERENCES "catagory"("id");
ALTER TABLE "questions" ADD CONSTRAINT "questions_fk1" FOREIGN KEY ("style_id") REFERENCES "question_styles"("id");


ALTER TABLE "possible_responses" ADD CONSTRAINT "possible_responses_fk0" FOREIGN KEY ("question_id") REFERENCES "questions"("id");
ALTER TABLE "possible_responses" ADD CONSTRAINT "possible_responses_fk1" FOREIGN KEY ("style_id") REFERENCES "response_style"("id");



ALTER TABLE "employee_results" ADD CONSTRAINT "employee_results_fk0" FOREIGN KEY ("client_id") REFERENCES "client"("id");
ALTER TABLE "employee_results" ADD CONSTRAINT "employee_results_fk1" FOREIGN KEY ("question_id") REFERENCES "questions"("id");
ALTER TABLE "employee_results" ADD CONSTRAINT "employee_results_fk2" FOREIGN KEY ("response_id") REFERENCES "possible_responses"("id");

ALTER TABLE "selected_kpi" ADD CONSTRAINT "selected_kpi_fk0" FOREIGN KEY ("client_id") REFERENCES "client"("id");
ALTER TABLE "selected_kpi" ADD CONSTRAINT "selected_kpi_fk1" FOREIGN KEY ("kpi_id") REFERENCES "catagory"("id");

