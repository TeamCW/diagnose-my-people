-- create database named diagnose_my_people --

CREATE TABLE "category" (
	"id" serial NOT NULL,
	"kpi" varchar NOT NULL,
	CONSTRAINT category_pk PRIMARY KEY ("id")
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
	"notes_added" varchar(140),
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
	"status" varchar NOT NULL DEFAULT 'New Client',
	"comments" varchar,
	CONSTRAINT client_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("kpi_id") REFERENCES "category"("id");
ALTER TABLE "questions" ADD CONSTRAINT "questions_fk1" FOREIGN KEY ("style_id") REFERENCES "question_styles"("id");


ALTER TABLE "possible_responses" ADD CONSTRAINT "possible_responses_fk0" FOREIGN KEY ("question_id") REFERENCES "questions"("id");
ALTER TABLE "possible_responses" ADD CONSTRAINT "possible_responses_fk1" FOREIGN KEY ("style_id") REFERENCES "response_style"("id");



ALTER TABLE "employee_results" ADD CONSTRAINT "employee_results_fk0" FOREIGN KEY ("client_id") REFERENCES "client"("id");
ALTER TABLE "employee_results" ADD CONSTRAINT "employee_results_fk1" FOREIGN KEY ("question_id") REFERENCES "questions"("id");
ALTER TABLE "employee_results" ADD CONSTRAINT "employee_results_fk2" FOREIGN KEY ("response_id") REFERENCES "possible_responses"("id");

ALTER TABLE "selected_kpi" ADD CONSTRAINT "selected_kpi_fk0" FOREIGN KEY ("client_id") REFERENCES "client"("id");
ALTER TABLE "selected_kpi" ADD CONSTRAINT "selected_kpi_fk1" FOREIGN KEY ("kpi_id") REFERENCES "category"("id");







INSERT INTO client (point_of_contact, contact_email, organization, contact_number, position, status)
VALUES ('John Smith', 'JohnSmith@ABCTowing.com', 'ABC Towing', '555-1234', 'President', 'Finished'),
('Tim Cook', 'Tim@Apple.com', 'Apple', null, 'CEO', default),
('Mark Zuckerberg', 'Mark@Facebook.com', 'Facebook', null, 'CEO', default),
('Jeff Bezos', 'Jeff@Amazon.com', 'Amazon', '123-4567', 'CEO', 'In Progress');


INSERT INTO category (kpi)
VALUES ('demographic'),('location'),('amenities'),('brand'),('retention'),('conclusion');

INSERT INTO question_styles (display_style_type)
VALUES ('multiple_choice'), ('buttons'), ('slider'), ('dropdown'), ('text_input');

INSERT INTO response_style (display_style_type)
VALUES ('bar_chart'), ('pie_chart'), ('wave_chart'), ('vertical_chart'), ('text'), ('line_chart');



INSERT INTO questions (question, kpi_id, style_id)
VALUES ('What year were you born?', 1, 1), 
('Please select your service line / department', 1, 4), 
('Which of the following best describes your current work setting?', 1, 4), 
('How many years have you worked for our company?', 1, 4), 
('What is your average commute time?', 2, 5), 
('Would you prefer public transit or driving?', 2, 2), 
('Do you commute to the office everyday?', 2, 2), 
('How satisfied are you with parking arrangements at our current office?', 2, 3), 
('If a partial “work from home” policy was implemented, do you see yourself using this as an alternative working style?', 3, 2), 
('Please rate how often you use the building’s amenities(1 being never, 5 being daily)', 3, 3), 
('Would additional building amenities such as restaurants, a fitness center and/or  locker room be something you could see yourself using?', 3, 2), 
('Please select any amenities you would like to have in an ideal location from the following options', 3, 2), 
('How do you perceive our company’s stance on environmental stewardship and sustainability?', 4, 3), 
('Do you feel our current facility reflects our company’s brand?', 4, 2), 
('Do you feel our customers care about our workspace?', 4, 2), 
('How would you rate our company’s current public exposure?', 4, 3), 
('Is it important for our business needs to have a public face? If so, can this be better achieved in a new location or our current space?', 4, 3), 
('How does our current space stack up against other office spaces you have worked in?', 4, 3), 
('Please rate your current work areas access to daylight and natural views', 5, 3), 
('On a scale of 1-5 where 1 is no impact and 5 is very impactful, how big of an impact does our work space have on your intent to stay with our company?', 5, 3), 
('Do you feel our current work environment provides you with enough space to meet your needs?', 5, 3), 
('Where are you working during an average work week? (Please equal 100%)', 5, 3), 
('Regarding you and your job, how would you rate your overall job satisfaction?', 6, 3), 
('Do you feel our space fosters: (1 being very poor, 5 being very good)', 6, 1), 
('Is there any additional comments or notes we should know regarding the positives and negatives of our current building location? Please note, this is not a comment on the design or function of the space, but rather the overall building location, condition and amenities.', 6, 5);
