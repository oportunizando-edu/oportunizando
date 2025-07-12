-- migrate-dev.sql - Development Migration

-- Criar extensão para suportar UUIDs, se ainda não estiver ativada
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela de usuários com UUID como chave primária
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar função para atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at automaticamente
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Criar tabela de oportunidades
CREATE TABLE IF NOT EXISTS opportunities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  local VARCHAR(255),
  deadline DATE,
  link VARCHAR(500),
  benefits TEXT,
  requirements TEXT,
  is_open BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de relacionamento entre usuários e oportunidades
CREATE TABLE IF NOT EXISTS users_opportunities (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  opportunity_id INTEGER REFERENCES opportunities(id) ON DELETE CASCADE,
  state VARCHAR(20) DEFAULT 'a-fazer' CHECK (state IN ('a-fazer', 'fazendo', 'feito')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, opportunity_id)
);

-- Adicionar coluna updated_at se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users_opportunities' AND column_name = 'updated_at') THEN
        ALTER TABLE users_opportunities ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    END IF;
END $$;

-- Adicionar coluna created_at se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users_opportunities' AND column_name = 'created_at') THEN
        ALTER TABLE users_opportunities ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    END IF;
END $$;

-- Adicionar constraint UNIQUE se não existir
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'users_opportunities_user_id_opportunity_id_key') THEN
        ALTER TABLE users_opportunities ADD CONSTRAINT users_opportunities_user_id_opportunity_id_key UNIQUE (user_id, opportunity_id);
    END IF;
END $$;

-- Criar trigger para atualizar updated_at na tabela opportunities
DROP TRIGGER IF EXISTS update_opportunities_updated_at ON opportunities;
CREATE TRIGGER update_opportunities_updated_at 
    BEFORE UPDATE ON opportunities 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Criar trigger para atualizar updated_at na tabela users_opportunities
DROP TRIGGER IF EXISTS update_users_opportunities_updated_at ON users_opportunities;
CREATE TRIGGER update_users_opportunities_updated_at 
    BEFORE UPDATE ON users_opportunities 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de teste para desenvolvimento
INSERT INTO users (name, email, password)
VALUES 
  ('Alice Smith', 'alice.smith@example.com', 'password123'),
  ('Bob Johnson', 'bob.johnson@example.com', 'password123'),
  ('Carol Williams', 'carol.williams@example.com', 'password123'),
  ('David Jones', 'david.jones@example.com', 'password123'),
  ('Emma Brown', 'emma.brown@example.com', 'password123'),
  ('Frank Davis', 'frank.davis@example.com', 'password123'),
  ('Grace Wilson', 'grace.wilson@example.com', 'password123'),
  ('Henry Moore', 'henry.moore@example.com', 'password123'),
  ('Isabella Taylor', 'isabella.taylor@example.com', 'password123'),
  ('Jack Lee', 'jack.lee@example.com', 'password123'),
  ('Kate Clark', 'kate.clark@example.com', 'password123'),
  ('Liam Martinez', 'liam.martinez@example.com', 'password123'),
  ('Mia Rodriguez', 'mia.rodriguez@example.com', 'password123'),
  ('Noah Garcia', 'noah.garcia@example.com', 'password123'),
  ('Olivia Hernandez', 'olivia.hernandez@example.com', 'password123'),
  ('Patrick Martinez', 'patrick.martinez@example.com', 'password123'),
  ('Quinn Lopez', 'quinn.lopez@example.com', 'password123'),
  ('Rose Thompson', 'rose.thompson@example.com', 'password123'),
  ('Samuel Perez', 'samuel.perez@example.com', 'password123'),
  ('Tara Scott', 'tara.scott@example.com', 'password123')
ON CONFLICT (email) DO NOTHING;

-- Inserir oportunidades de teste
INSERT INTO opportunities (title, description, local, deadline, link, benefits, requirements, is_open)
VALUES 
  ('Estágio em Desenvolvimento Web', 'Oportunidade para estagiários em desenvolvimento web com React e Node.js', 'São Paulo, SP', '2024-12-31', 'https://example.com/estagio', 'Bolsa de R$ 1500\nVale refeição\nPlano de saúde', 'Conhecimento em JavaScript\nEstudante de TI\nDisponibilidade para 6h/dia', true),
  ('Programa de Liderança Jovem', 'Programa intensivo de desenvolvimento de liderança para jovens', 'Rio de Janeiro, RJ', '2024-11-30', 'https://example.com/lideranca', 'Mentoria personalizada\nRede de contatos\nCertificado internacional', 'Idade entre 18-25 anos\nInglês intermediário\nDisponibilidade para viagens', true),
  ('Bolsa de Pesquisa em IA', 'Bolsa para pesquisa em inteligência artificial na USP', 'São Paulo, SP', '2024-10-15', 'https://example.com/pesquisa', 'Bolsa de R$ 2000\nAcesso a laboratórios\nPublicação científica', 'Graduação em computação\nConhecimento em Python\nDisponibilidade integral', true)
ON CONFLICT DO NOTHING;