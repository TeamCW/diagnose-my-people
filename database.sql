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



ALTER TABLE "employee_results" ADD CONSTRAINT "employee_results_fk0" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE;
ALTER TABLE "employee_results" ADD CONSTRAINT "employee_results_fk1" FOREIGN KEY ("question_id") REFERENCES "questions"("id");
ALTER TABLE "employee_results" ADD CONSTRAINT "employee_results_fk2" FOREIGN KEY ("response_id") REFERENCES "possible_responses"("id");

ALTER TABLE "selected_kpi" ADD CONSTRAINT "selected_kpi_fk0" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE CASCADE;
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
('If a partial “work from home” policy was implemented, would you see yourself using this as an alternative working style?', 3, 2), 
('Please rate how often you use the building’s amenities (1 being never, 5 being daily)', 3, 3), 
('Would additional building amenities such as restaurants, a fitness center and/or locker room be something you could see yourself using?', 3, 2), 
('Please select any amenities you would like to have in an ideal location from the following options', 3, 2), 
('How do you perceive our company’s stance on environmental stewardship and sustainability?', 4, 3), 
('Do you feel our current facility reflects our company’s brand?', 4, 2), 
('Do you feel our customers care about our workspace?', 4, 2), 
('How would you rate our company’s current public exposure?', 4, 3), 
('Is it important for our business needs to have a public face? If so, can this be better achieved in a new location or our current space?', 4, 3), 
('How does our current space stack up against other office spaces you have worked in?', 4, 3), 
('Please rate your current work areas access to daylight and natural views', 5, 3), 
('On a scale of 1-5, where 1 is no impact and 5 is very impactful, how big of an impact does our work space have on your intent to stay with our company?', 5, 3), 
('Do you feel our current work environment provides you with enough space to meet your needs?', 5, 3), 
('Where are you working during an average work week? (Please equal 100%)', 5, 3), 
('Regarding you and your job, how would you rate your overall job satisfaction?', 6, 3), 
('Do you feel our space fosters: (1 being very poor, 5 being very good)', 6, 1), 
('Are there any additional comments or notes we should know regarding the positives and negatives of our current building location? Please note, this is not a comment on the design or function of the space, but rather the overall building location, condition and amenities.', 6, 5);



INSERT INTO possible_responses (question_id, response_text, style_id)
VALUES (1, '1964 or earlier', 1), (1, '1965-1980', 1), (1, '1981 or after', 1), 
(2, 'Customer/Account Services', 4), (2, 'Finance', 4), (2, 'Business Development', 4), (2, 'Administrative', 4), (2, 'Research', 4), (2, 'Management', 4), (2, 'Legal', 4), (2, 'Executive', 4), 
(3, 'Creative', 3), (3, 'Corporate', 3), (3, 'Healthcare', 3), (3, 'General Office', 3), (3, 'Pro Services Firm', 3), (3, 'Technology', 3), (4, '0-1', 2), 
(4, '1-3', 2), (4, '3-5', 2), (4, '5-10', 2), (4, '10+', 2), 
(5, '00', 5), 
(6, 'Public Transit', 2), (6, 'Driving', 2), 
(7, 'Yes', 2), (7, 'No', 2), 
(8, 'Very Satisfied', 1), (8, 'Satisfied', 1), (8, 'No Opinion', 1), (8, 'Dissatisfied', 1), (8, 'Very Dissatisfied', 1), 
(9, 'Yes', 2), (9, 'No', 2), (10, '1', 3), (10, '2', 3), (10, '3', 3), 
(10, '4', 3), (10, '5', 3), (11, 'Yes', 2), 
(11, 'No', 2), (12, 'Food and Entertainment', 1), 
(12, 'Conference Room', 1), (12, 'Green Space', 1), (12, 'Shower/Locker Room', 1), (12, 'Parking', 1), (12, 'Fitness Center', 1), (12, 'Public Transit', 1), 
(13, 'Very Poor', 1), (13, 'Poor', 1), (13, 'No Opinion', 1), (13, 'Good', 1), (13, 'Very Good', 1),
 (14, 'Yes', 2), (14, 'No', 2), 
 (15, 'Yes', 2), (15, 'No', 2), 
 (16, 'Very Poor', 1), (16, 'Poor', 1), (16, 'No Opinion', 1), (16, 'Good', 1), (16, 'Very Good', 1), 
 (17, 'Yes', 2), (17, 'No', 2), (17, 'New Location', 2), (17, 'Current Space', 2), 
 (18, 'Very Inferior', 3), (18, 'Inferior', 3), (18, 'Same', 3), (18, 'Superior', 3), (18, 'Highly Superior', 3), 
 (19, 'Very Poor', 1), (19, 'Poor', 1), (19, 'No Opinion', 1), (19, 'Good', 1), (19, 'Very Good', 1), 
 (20, '1', 1), (20, '2', 1), (20, '3', 1), (20, '4', 1), (20, '5', 1), 
 (21, 'Very Poor', 1), (21, 'Poor', 1), (21, 'No Opinion', 1), (21, 'Good', 1), (21, 'Very Good', 1), 
 (22, 'Home:', 1), (22, 'Office Desk:', 1), (22, 'Elsewhere In The Office:', 1), (22, 'Coffee Shop:', 1), (22, 'On-site With Client:', 1), (22, 'Other:', 1), 
 (23, 'Very Dissatisfied', 1), (23, 'Dissatisfied', 1), (23, 'No Opinion', 1), (23, 'Satisfied', 1), (23, 'Very Satisfied', 1), 
 (24, 'Positive Culture:', 1), (24, 'Employee Wellbeing:', 1), (24, 'Worker Productivity:', 1), (24, 'Engagement Among Coworkers:', 1);