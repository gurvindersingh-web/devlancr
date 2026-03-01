-- ============================================
-- Dev_Lancr Freelancer Marketplace — MySQL Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS devlancr;
USE devlancr;

-- --------------------------------------------
-- 1. ROLES
-- --------------------------------------------
CREATE TABLE roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO roles (name) VALUES ('ROLE_CLIENT'), ('ROLE_FREELANCER'), ('ROLE_ADMIN');

-- --------------------------------------------
-- 2. USERS
-- --------------------------------------------
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------
-- 3. USER_ROLES (join table)
-- --------------------------------------------
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL,
    role_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------
-- 4. SKILLS
-- --------------------------------------------
CREATE TABLE skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

INSERT INTO skills (name) VALUES
('Java'), ('Spring Boot'), ('React'), ('JavaScript'), ('TypeScript'),
('Python'), ('Node.js'), ('Angular'), ('Vue.js'), ('PHP'),
('Laravel'), ('Django'), ('Ruby on Rails'), ('Go'), ('Rust'),
('Swift'), ('Kotlin'), ('Flutter'), ('React Native'), ('AWS'),
('Docker'), ('Kubernetes'), ('PostgreSQL'), ('MySQL'), ('MongoDB'),
('GraphQL'), ('REST API'), ('UI/UX Design'), ('Figma'), ('Adobe XD'),
('Machine Learning'), ('Data Science'), ('DevOps'), ('CI/CD'), ('Blockchain'),
('Solidity'), ('Web3'), ('SEO'), ('Content Writing'), ('Video Editing');

-- --------------------------------------------
-- 5. FREELANCER_PROFILES
-- --------------------------------------------
CREATE TABLE freelancer_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    title VARCHAR(200),
    bio TEXT,
    hourly_rate DECIMAL(10, 2) DEFAULT 0.00,
    experience_level ENUM('ENTRY', 'INTERMEDIATE', 'EXPERT') DEFAULT 'ENTRY',
    portfolio_url VARCHAR(500),
    avg_rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    total_earnings DECIMAL(12, 2) DEFAULT 0.00,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------
-- 6. FREELANCER_SKILLS (join table)
-- --------------------------------------------
CREATE TABLE freelancer_skills (
    freelancer_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    PRIMARY KEY (freelancer_id, skill_id),
    FOREIGN KEY (freelancer_id) REFERENCES freelancer_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------
-- 7. CLIENT_PROFILES
-- --------------------------------------------
CREATE TABLE client_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    company_name VARCHAR(200),
    company_description TEXT,
    website VARCHAR(500),
    total_spent DECIMAL(12, 2) DEFAULT 0.00,
    total_projects_posted INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------
-- 8. PROJECTS
-- --------------------------------------------
CREATE TABLE projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    client_id BIGINT NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT NOT NULL,
    project_type ENUM('FIXED', 'HOURLY') NOT NULL DEFAULT 'FIXED',
    budget_min DECIMAL(10, 2),
    budget_max DECIMAL(10, 2),
    status ENUM('OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'OPEN',
    experience_level ENUM('ENTRY', 'INTERMEDIATE', 'EXPERT') DEFAULT 'INTERMEDIATE',
    deadline TIMESTAMP NULL,
    total_proposals INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES client_profiles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------
-- 9. PROJECT_SKILLS (join table)
-- --------------------------------------------
CREATE TABLE project_skills (
    project_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    PRIMARY KEY (project_id, skill_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------
-- 10. PROPOSALS
-- --------------------------------------------
CREATE TABLE proposals (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    freelancer_id BIGINT NOT NULL,
    cover_letter TEXT NOT NULL,
    bid_amount DECIMAL(10, 2) NOT NULL,
    delivery_days INT NOT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'WITHDRAWN') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (freelancer_id) REFERENCES freelancer_profiles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_proposal (project_id, freelancer_id)
) ENGINE=InnoDB;

-- --------------------------------------------
-- 11. CONTRACTS
-- --------------------------------------------
CREATE TABLE contracts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT NOT NULL,
    client_id BIGINT NOT NULL,
    freelancer_id BIGINT NOT NULL,
    proposal_id BIGINT NOT NULL UNIQUE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('ACTIVE', 'COMPLETED', 'CANCELLED', 'DISPUTED') DEFAULT 'ACTIVE',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES client_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (freelancer_id) REFERENCES freelancer_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (proposal_id) REFERENCES proposals(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------
-- 12. MILESTONES
-- --------------------------------------------
CREATE TABLE milestones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contract_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('PENDING', 'FUNDED', 'IN_PROGRESS', 'SUBMITTED', 'APPROVED', 'RELEASED') DEFAULT 'PENDING',
    due_date TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------
-- 13. WALLETS
-- --------------------------------------------
CREATE TABLE wallets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    balance DECIMAL(12, 2) DEFAULT 0.00,
    escrow_balance DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- --------------------------------------------
-- 14. TRANSACTIONS
-- --------------------------------------------
CREATE TABLE transactions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    wallet_id BIGINT NOT NULL,
    milestone_id BIGINT,
    amount DECIMAL(10, 2) NOT NULL,
    platform_fee DECIMAL(10, 2) DEFAULT 0.00,
    transaction_type ENUM('DEPOSIT', 'WITHDRAWAL', 'ESCROW_FUND', 'ESCROW_RELEASE', 'PLATFORM_FEE', 'REFUND') NOT NULL,
    status ENUM('PENDING', 'COMPLETED', 'FAILED') DEFAULT 'PENDING',
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallets(id) ON DELETE CASCADE,
    FOREIGN KEY (milestone_id) REFERENCES milestones(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- --------------------------------------------
-- 15. MESSAGES
-- --------------------------------------------
CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contract_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_messages_contract ON messages(contract_id, created_at);

-- --------------------------------------------
-- 16. REVIEWS
-- --------------------------------------------
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contract_id BIGINT NOT NULL,
    reviewer_id BIGINT NOT NULL,
    reviewee_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewee_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_review (contract_id, reviewer_id)
) ENGINE=InnoDB;

-- --------------------------------------------
-- 17. NOTIFICATIONS
-- --------------------------------------------
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    notification_type ENUM('PROPOSAL_RECEIVED', 'PROJECT_AWARDED', 'MESSAGE_RECEIVED', 'PAYMENT_RELEASED', 'REVIEW_RECEIVED', 'DISPUTE_OPENED', 'SYSTEM') NOT NULL,
    reference_id BIGINT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read, created_at);

-- --------------------------------------------
-- 18. DISPUTES
-- --------------------------------------------
CREATE TABLE disputes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contract_id BIGINT NOT NULL,
    raised_by BIGINT NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('OPEN', 'UNDER_REVIEW', 'RESOLVED', 'CLOSED') DEFAULT 'OPEN',
    resolution TEXT,
    resolved_by BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (contract_id) REFERENCES contracts(id) ON DELETE CASCADE,
    FOREIGN KEY (raised_by) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resolved_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================
-- INDEXES for performance
-- ============================================
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_proposals_project ON proposals(project_id);
CREATE INDEX idx_proposals_freelancer ON proposals(freelancer_id);
CREATE INDEX idx_contracts_freelancer ON contracts(freelancer_id);
CREATE INDEX idx_contracts_client ON contracts(client_id);
CREATE INDEX idx_transactions_wallet ON transactions(wallet_id);
