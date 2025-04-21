-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2025 at 12:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mytest`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogg`
--

CREATE TABLE `blogg` (
  `sn` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `rate` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT 0,
  `name` varchar(255) DEFAULT NULL,
  `college` varchar(255) DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `calender`
--

CREATE TABLE `calender` (
  `sno` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `eventname` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `calender`
--

INSERT INTO `calender` (`sno`, `email`, `date`, `eventname`, `description`) VALUES
(1, 'rishad@gmail.com', '0000-00-00', 'Annual tour 2025', 'We are going to Sajek valle');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cartid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `cname` varchar(255) NOT NULL,
  `image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `sender` varchar(255) NOT NULL,
  `reciever` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mcq`
--

CREATE TABLE `mcq` (
  `sno` int(11) NOT NULL,
  `testid` varchar(255) NOT NULL,
  `question` text NOT NULL,
  `option1` text DEFAULT NULL,
  `option2` text DEFAULT NULL,
  `option3` text DEFAULT NULL,
  `option4` text DEFAULT NULL,
  `answer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `sno` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`sno`, `email`, `data`, `date`) VALUES
(2, 'rishad@gmail.com', 'English ct will be held on 2nd May', '2025-04-21 09:49:23');

-- --------------------------------------------------------

--
-- Table structure for table `pcourses`
--

CREATE TABLE `pcourses` (
  `cid` int(11) NOT NULL,
  `cname` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text NOT NULL,
  `image` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pcourses`
--

INSERT INTO `pcourses` (`cid`, `cname`, `price`, `description`, `image`) VALUES
(1, 'Introduction to Programming', 49.99, 'Learn basic programming concepts', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pmcq`
--

CREATE TABLE `pmcq` (
  `testid` varchar(255) NOT NULL,
  `index1` int(11) NOT NULL,
  `question` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `premiumresult`
--

CREATE TABLE `premiumresult` (
  `semail` varchar(255) NOT NULL,
  `testid` varchar(255) NOT NULL,
  `answers` text DEFAULT NULL,
  `marks` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

CREATE TABLE `result` (
  `semail` varchar(255) NOT NULL,
  `testid` varchar(255) NOT NULL,
  `answers` text DEFAULT NULL,
  `marks` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `rollno` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `sid` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `percentage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `semail` varchar(255) NOT NULL,
  `spassword` varchar(255) NOT NULL,
  `sname` varchar(255) NOT NULL,
  `srollno` varchar(50) DEFAULT NULL,
  `syear` int(11) DEFAULT NULL,
  `spno` varchar(20) DEFAULT NULL,
  `tenth` varchar(255) DEFAULT NULL,
  `twelth` varchar(255) DEFAULT NULL,
  `graduation` varchar(255) DEFAULT NULL,
  `profileImage` longblob DEFAULT NULL,
  `courses` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`semail`, `spassword`, `sname`, `srollno`, `syear`, `spno`, `tenth`, `twelth`, `graduation`, `profileImage`, `courses`) VALUES
('admin@example.com', '749f09bade8aca755660eeb17792da880218d4fbdc4e25fbec279d7fe9f65d70', 'Admin User', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('rishad@gmail.com', '$2b$10$43GTC0ZzISeW/xP7pvsOke2Ld/TbpN8HF7Z.gMykE9FKEPdb7rfbC', 'Rishad', '21701058', 2021, '0192939330', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `student_courses`
--

CREATE TABLE `student_courses` (
  `semail` varchar(255) NOT NULL,
  `cid` int(11) NOT NULL,
  `purchase_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `temail` varchar(255) NOT NULL,
  `tpassword` varchar(255) NOT NULL,
  `tname` varchar(255) NOT NULL,
  `tpno` varchar(20) DEFAULT NULL,
  `tid` varchar(255) DEFAULT NULL,
  `experience` text DEFAULT '',
  `profileImage` longblob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`temail`, `tpassword`, `tname`, `tpno`, `tid`, `experience`, `profileImage`) VALUES
('tonmoy@gmail.com', '$2b$10$be6bJO4l7mUGoAjA1GC1kus2ZhazSF2vQrI9puk2wBTkva0y2FSxq', 'Tonmoy', '0190253207', '32939', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `testid` varchar(255) NOT NULL,
  `testName` varchar(255) NOT NULL,
  `temail` varchar(255) NOT NULL,
  `tid` varchar(255) NOT NULL,
  `Date` datetime NOT NULL,
  `url` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`testid`, `testName`, `temail`, `tid`, `Date`, `url`) VALUES
('1200', 'English', 'tonmoy@gmail.com', '32939', '2025-04-20 23:54:48', 'http://localhost:3000/testlogin?name=English&id=32939&code=1200'),
('1500', 'Math', 'tonmoy@gmail.com', '32939', '2025-04-21 09:37:30', 'http://localhost:3000/testlogin?name=Math&id=32939&code=1500');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogg`
--
ALTER TABLE `blogg`
  ADD PRIMARY KEY (`sn`),
  ADD KEY `idx_blogg_author` (`email`);

--
-- Indexes for table `calender`
--
ALTER TABLE `calender`
  ADD PRIMARY KEY (`sno`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartid`),
  ADD KEY `cid` (`cid`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender` (`sender`),
  ADD KEY `reciever` (`reciever`),
  ADD KEY `idx_chat_dates` (`date`);

--
-- Indexes for table `mcq`
--
ALTER TABLE `mcq`
  ADD PRIMARY KEY (`testid`,`sno`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`sno`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `pcourses`
--
ALTER TABLE `pcourses`
  ADD PRIMARY KEY (`cid`),
  ADD UNIQUE KEY `cname` (`cname`);

--
-- Indexes for table `pmcq`
--
ALTER TABLE `pmcq`
  ADD PRIMARY KEY (`testid`,`index1`);

--
-- Indexes for table `premiumresult`
--
ALTER TABLE `premiumresult`
  ADD PRIMARY KEY (`semail`,`testid`),
  ADD KEY `testid` (`testid`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
  ADD PRIMARY KEY (`semail`,`testid`),
  ADD KEY `testid` (`testid`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`semail`);

--
-- Indexes for table `student_courses`
--
ALTER TABLE `student_courses`
  ADD PRIMARY KEY (`semail`,`cid`),
  ADD KEY `cid` (`cid`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`temail`),
  ADD UNIQUE KEY `tid` (`tid`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`testid`),
  ADD KEY `temail` (`temail`),
  ADD KEY `idx_test_dates` (`Date`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogg`
--
ALTER TABLE `blogg`
  MODIFY `sn` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `calender`
--
ALTER TABLE `calender`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cartid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `sno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pcourses`
--
ALTER TABLE `pcourses`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `skill`
--
ALTER TABLE `skill`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogg`
--
ALTER TABLE `blogg`
  ADD CONSTRAINT `blogg_ibfk_1` FOREIGN KEY (`email`) REFERENCES `student` (`semail`) ON DELETE SET NULL;

--
-- Constraints for table `calender`
--
ALTER TABLE `calender`
  ADD CONSTRAINT `calender_ibfk_1` FOREIGN KEY (`email`) REFERENCES `student` (`semail`) ON DELETE CASCADE;

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `pcourses` (`cid`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`email`) REFERENCES `student` (`semail`) ON DELETE CASCADE;

--
-- Constraints for table `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `student` (`semail`) ON DELETE CASCADE,
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`reciever`) REFERENCES `teacher` (`temail`) ON DELETE CASCADE;

--
-- Constraints for table `mcq`
--
ALTER TABLE `mcq`
  ADD CONSTRAINT `mcq_ibfk_1` FOREIGN KEY (`testid`) REFERENCES `test` (`testid`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`email`) REFERENCES `student` (`semail`) ON DELETE CASCADE;

--
-- Constraints for table `pmcq`
--
ALTER TABLE `pmcq`
  ADD CONSTRAINT `pmcq_ibfk_1` FOREIGN KEY (`testid`) REFERENCES `test` (`testid`) ON DELETE CASCADE;

--
-- Constraints for table `premiumresult`
--
ALTER TABLE `premiumresult`
  ADD CONSTRAINT `premiumresult_ibfk_1` FOREIGN KEY (`semail`) REFERENCES `student` (`semail`) ON DELETE CASCADE,
  ADD CONSTRAINT `premiumresult_ibfk_2` FOREIGN KEY (`testid`) REFERENCES `test` (`testid`) ON DELETE CASCADE;

--
-- Constraints for table `result`
--
ALTER TABLE `result`
  ADD CONSTRAINT `result_ibfk_1` FOREIGN KEY (`semail`) REFERENCES `student` (`semail`) ON DELETE CASCADE,
  ADD CONSTRAINT `result_ibfk_2` FOREIGN KEY (`testid`) REFERENCES `test` (`testid`) ON DELETE CASCADE;

--
-- Constraints for table `skill`
--
ALTER TABLE `skill`
  ADD CONSTRAINT `skill_ibfk_1` FOREIGN KEY (`email`) REFERENCES `student` (`semail`) ON DELETE CASCADE;

--
-- Constraints for table `student_courses`
--
ALTER TABLE `student_courses`
  ADD CONSTRAINT `student_courses_ibfk_1` FOREIGN KEY (`semail`) REFERENCES `student` (`semail`) ON DELETE CASCADE,
  ADD CONSTRAINT `student_courses_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `pcourses` (`cid`) ON DELETE CASCADE;

--
-- Constraints for table `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `test_ibfk_1` FOREIGN KEY (`temail`) REFERENCES `teacher` (`temail`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
