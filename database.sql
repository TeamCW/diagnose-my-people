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
	"survey_hash" varchar NOT NULL UNIQUE,
	"contact_number" varchar,
	"status" varchar NOT NULL DEFAULT 'New Client',
	"comments" varchar,
	"logo_url" varchar,
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







INSERT INTO category (kpi)
VALUES ('demographic'),('location'),('amenities'),('brand'),('retention'),('conclusion');

INSERT INTO question_styles (display_style_type)
VALUES ('dropdown'), ('slider'), ('text_input'), ('blank');

INSERT INTO response_style (display_style_type)
VALUES ('bar_chart'), ('pie_chart'), ('wave_chart'), ('vertical_chart'), ('text'), ('line_chart');

INSERT INTO questions (question, kpi_id, style_id)
VALUES ('When were you born?', 1, 1),
('Please select your service line / department', 1, 1),
('Which of the following best describes your current work setting?', 1, 1),
('How many years have you worked for our company?', 1, 1),
('What is your average commute time?', 2, 1),
('How do you currently commute to work?', 2, 1),
('How would you prefer to commute to work?', 2, 1),
('How satisfied are you with parking arrangements at your current work setting?', 2, 2),
('If a partial “work from home” policy was implemented, how often would you see yourself using this as an alternative working style?', 2, 2),
('Please rate how often you use your current building’s amenities, such as a fitness center or lounge area, in an average week.', 3, 2),
('If a ‘3rd work space’ was available in your building, such as a coffee shop, lounge or common space, how often do you think you would use it in a week? ', 3, 2), 
('Please rate the following amenities you would like to have in an ideal location: (1 being no preference, 5 being highly preferable', 3, 4),
('Food and Entertainment:', 3, 1),
('Conference Room:', 3, 1),
('Green Space:', 3, 1),
('Shower/Locker Room:', 3, 1),
('Fitness Center:', 3, 1),
('Parking:', 3, 1),
('Public Transit:', 3, 1),
('How do you perceive our company’s stance on environmental stewardship and sustainability?', 4, 2),
('How well do you feel our current facility reflects our company’s brand and mission statement?', 4, 2),
('What kind of impression do you feel our current work space has on our customers?', 4, 2),
('How would you rate our company’s current public exposure?', 4, 2),
('How important is it for our business to have a public face?', 4, 2),
('How impactful would a new location be to our companies public face?', 4, 2),
('How does our current space compare to other office spaces you have worked in or visited?', 4, 2),
('Please rate your current work areas access to daylight and natural views', 5, 2),
('How much impact does your location have on your workplace satisfaction?', 5, 2),
('How well does your current work environment provide the space to meet you and your teams needs?', 5, 2),
('Where are you working during an average work week? (Please equal 100%)', 5, 4),
('Home:', 5, 1),
('Office desk:', 5, 1),
('Elsewhere in the office:', 5, 1),
('Coffee shop:', 5, 1),
('On-site with client:', 5, 1),
('Other:', 5, 1),
('How would you rate your overall satisfaction with your current work space?', 6, 2),
('How well does our space foster:', 6, 4),
('Positive culture:', 6, 2),
('Employee wellbeing:', 6, 2),
('Worker productivity:', 6,2),
('Engagement among coworkers:', 6, 2),
('Are there any additional comments or notes we should know regarding the positives and negatives of our current building location? Please note, this is not a comment on the design or function of the space, but rather the overall building location, condition and amenities.', 6, 3);



INSERT INTO possible_responses (id, question_id, response_text, style_id)
VALUES (1, '1960 or Earlier', 1), (1, '1961 - 1970', 1), (1, '1971 - 1980', 1), (1, '1981 - 1990', 1), (1, '1991 or Later', 1),
(2, 'Customer/Account Services', 4), (2, 'Finance', 4), (2, 'Sales', 4), (2, 'Administrative', 4), (2, 'Research', 4), (2, 'Management', 4), (2, 'Legal', 4), (2, 'Executive', 4), (2, 'Marketing', 4), (2, 'Creative', 4), (2, 'Other', 4),
(3, 'Creative', 3), (3, 'Corporate', 3), (3, 'Healthcare', 3), (3, 'General Office', 3), (3, 'Technology', 3), (3, 'Other', 3), (4, '0-1', 2),
(4, '1-3', 2), (4, '3-5', 2), (4, '5-10', 2), (4, '10+', 2),
(5, '5-10 minutes', 2), (5, '10-20 minutes', 2), (5, '20-30 minutes', 2), (5, '30-40 minutes', 2), (5, '40+ minutes', 2),
(6, 'Public Transit', 2), (6, 'Driving', 2), (6, 'Walking/Biking', 2), (6, 'Rideshare', 2),
(7, 'Public Transit', 2), (7, 'Driving', 2), (7, 'Walking/Biking', 2), (7, 'Rideshare', 2),
(8, 'Very Satisfied', 1), (8, 'Satisfied', 1), (8, 'No Opinion', 1), (8, 'Dissatisfied', 1), (8, 'Very Dissatisfied', 1),
(9, 'Never', 1), (9, 'Rarely', 1), (9, 'Half my time', 1), (9, 'Often', 1), (9, 'Very often', 1), (10, 'Never', 3), (10, 'Once', 3), (10, 'Twice', 3), (10, 'Often', 3), (10, 'Daily', 3), (11, 'Never', 1),
(11, 'Rarely', 1), (11, 'A few times', 1), (11, 'Often', 1), (11, 'Daily', 1),
(12, '00', 1),
(13, '1', 1), (13, '2', 1), (13, '3', 1), (13, '4', 1), (13, '5', 1), (14, '1', 1), (14, '2', 1), (14, '3', 1), (14, '4', 1), (14, '5', 1), (15, '1', 1), (15, '2', 1), (15, '3', 1), (15, '4', 1), (15, '5', 1), (16, '1', 1), (16, '2', 1), (16, '3', 1), (16, '4', 1), (16, '5', 1), (17, '1', 1), (17, '2', 1), (17, '3', 1), (17, '4', 1), (17, '5', 1), (18, '1', 1), (18, '2', 1), (18, '3', 1), (18, '4', 1), (18, '5', 1), (19, '1', 1), (19, '2', 1), (19, '3', 1), (19, '4', 1), (19, '5', 1), 
(20, 'Very Poor', 1), (20, 'Poor', 1), (20, 'No Opinion', 1), (20, 'Good', 1), (20, 'Very Good', 1),
(21, 'Very Poor', 1), (21, 'Poor', 1), (21, 'No Opinion', 1), (21, 'Good', 1), (21, 'Very Good', 1),
(22, 'Very Poor', 1), (22, 'Poor', 1), (22, 'No Opinion', 1), (22, 'Good', 1), (22, 'Very Good', 1),
(23, 'Very Poor', 1), (23, 'Poor', 1), (23, 'No Opinion', 1), (23, 'Good', 1), (23, 'Very Good', 1),
(24, 'Not at all', 1), (24, 'Minimal', 1), (24, 'Important', 1), (24, 'Very Important', 1), (24, 'Essential', 1),
(25, 'Not at all', 1), (25, 'Minimal', 1), (25, 'Impactful', 1), (25, 'Very Impactful', 1), (25, 'Critical', 1),
(26, 'Very Inferior', 3), (26, 'Inferior', 3), (26, 'Same', 3), (26, 'Superior', 3), (26, 'Highly Superior', 3),
(27, 'Very Poor', 1), (27, 'Poor', 1), (27, 'No Opinion', 1), (27, 'Good', 1), (27, 'Very Good', 1),
(28, 'Not at all', 1), (28, 'Minimal', 1), (28, 'Impactful', 1), (28, 'Very impactful', 1), (28, 'Crucial', 1),
(29, 'Not at all', 1), (29, 'Poorly', 1), (29, 'Satisfactory', 1), (29, 'Very well', 1), (29, 'Exceptional', 1),
(30, '0', 5),
(31, '0-10%', 1), (31, '10-20%', 1), (31, '20-40%', 1), (31, '40-60%', 1), (31, '60-80%', 1), (31, '80-100%', 1),
(32, '0-10%', 1), (32, '10-20%', 1), (32, '20-40%', 1), (32, '40-60%', 1), (32, '60-80%', 1), (32, '80-100%', 1),
(33, '0-10%', 1), (33, '10-20%', 1), (33, '20-40%', 1), (33, '40-60%', 1), (33, '60-80%', 1), (33, '80-100%', 1),
(34, '0-10%', 1), (34, '10-20%', 1), (34, '20-40%', 1), (34, '40-60%', 1), (34, '60-80%', 1), (34, '80-100%', 1),
(35, '0-10%', 1), (35, '10-20%', 1), (35, '20-40%', 1), (35, '40-60%', 1), (35, '60-80%', 1), (35, '80-100%', 1),
(36, '0-10%', 1), (36, '10-20%', 1), (36, '20-40%', 1), (36, '40-60%', 1), (36, '60-80%', 1), (36, '80-100%', 1),
(37, 'Unsatisfactory', 1), (37, 'Poor', 1), (37, 'Satisfactory', 1), (37, 'Good', 1), (37, 'Excellent', 1),
(38, '00', 1),
(39, 'Not at all', 1), (39, 'Poorly', 1), (39, 'Satisfactory', 1), (39, 'Very well', 1), (39, 'Exceptional', 1),
(40, 'Not at all', 1), (40, 'Poorly', 1), (40, 'Satisfactory', 1), (40, 'Very well', 1), (40, 'Exceptional', 1),
(41, 'Not at all', 1), (41, 'Poorly', 1), (41, 'Satisfactory', 1), (41, 'Very well', 1), (41, 'Exceptional', 1),
(42, 'Not at all', 1), (42, 'Poorly', 1), (42, 'Satisfactory', 1), (42, 'Very well', 1), (42, 'Exceptional', 1),
(43, '00', 1);

