-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('patient', 'doctor', 'admin');

-- Create Users table (profiles linked to auth.users)
CREATE TABLE public.users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    cccd TEXT UNIQUE NOT NULL,
    phone TEXT,
    role public.app_role DEFAULT 'patient' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create Patients table
CREATE TABLE public.patients (
    patient_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE UNIQUE,
    gender TEXT CHECK (gender IN ('male', 'female', 'other')),
    dob DATE,
    address TEXT,
    medical_history TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Create Departments table
CREATE TABLE public.departments (
    dept_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dept_name TEXT NOT NULL,
    location TEXT,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

-- Create Specialties table
CREATE TABLE public.specialties (
    specialty_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dept_id UUID NOT NULL REFERENCES public.departments(dept_id) ON DELETE CASCADE,
    specialty_name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.specialties ENABLE ROW LEVEL SECURITY;

-- Create Doctors table
CREATE TABLE public.doctors (
    doctor_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(user_id) ON DELETE CASCADE UNIQUE,
    dept_id UUID NOT NULL REFERENCES public.departments(dept_id) ON DELETE CASCADE,
    degree TEXT,
    experience_years INT,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- Create Doctor_Specialties junction table
CREATE TABLE public.doctor_specialties (
    doctor_id UUID NOT NULL REFERENCES public.doctors(doctor_id) ON DELETE CASCADE,
    specialty_id UUID NOT NULL REFERENCES public.specialties(specialty_id) ON DELETE CASCADE,
    PRIMARY KEY (doctor_id, specialty_id)
);

ALTER TABLE public.doctor_specialties ENABLE ROW LEVEL SECURITY;

-- Create Diseases table
CREATE TABLE public.diseases (
    disease_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disease_name TEXT NOT NULL,
    description TEXT,
    dept_id UUID NOT NULL REFERENCES public.departments(dept_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.diseases ENABLE ROW LEVEL SECURITY;

-- Create Symptoms table
CREATE TABLE public.symptoms (
    symptom_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    symptom_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.symptoms ENABLE ROW LEVEL SECURITY;

-- Create Disease_Symptoms junction table
CREATE TABLE public.disease_symptoms (
    disease_id UUID NOT NULL REFERENCES public.diseases(disease_id) ON DELETE CASCADE,
    symptom_id UUID NOT NULL REFERENCES public.symptoms(symptom_id) ON DELETE CASCADE,
    PRIMARY KEY (disease_id, symptom_id)
);

ALTER TABLE public.disease_symptoms ENABLE ROW LEVEL SECURITY;

-- Create Time_Slots table
CREATE TABLE public.time_slots (
    slot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;

-- Insert default time slots
INSERT INTO public.time_slots (start_time, end_time, slot_name)
VALUES 
('08:00', '10:00', '8h00 - 10h00'),
('13:00', '15:00', '13h00 - 15h00'),
('15:00', '17:00', '15h00 - 17h00'),
('17:00', '19:00', '17h00 - 19h00'),
('19:00', '21:00', '19h00 - 21h00');

-- Create Appointments table
CREATE TABLE public.appointments (
    appointment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.patients(patient_id) ON DELETE CASCADE,
    doctor_id UUID NOT NULL REFERENCES public.doctors(doctor_id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    slot_id UUID NOT NULL REFERENCES public.time_slots(slot_id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')) DEFAULT 'pending',
    initial_symptoms TEXT,
    ai_diagnosis TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_doctor_date_slot UNIQUE (doctor_id, appointment_date, slot_id)
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create Medical_Records table
CREATE TABLE public.medical_records (
    record_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id UUID NOT NULL REFERENCES public.appointments(appointment_id) ON DELETE CASCADE,
    diagnosis TEXT,
    prescription TEXT,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users
CREATE POLICY "Users can view their own data"
ON public.users FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own data"
ON public.users FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for patients
CREATE POLICY "Patients can view their own data"
ON public.patients FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Patients can update their own data"
ON public.patients FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Patients can insert their own data"
ON public.patients FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for departments (public read)
CREATE POLICY "Anyone can view departments"
ON public.departments FOR SELECT
USING (TRUE);

-- RLS Policies for specialties (public read)
CREATE POLICY "Anyone can view specialties"
ON public.specialties FOR SELECT
USING (TRUE);

-- RLS Policies for doctors (public read)
CREATE POLICY "Anyone can view doctors"
ON public.doctors FOR SELECT
USING (TRUE);

CREATE POLICY "Doctors can view their own data"
ON public.doctors FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Doctors can update their own data"
ON public.doctors FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for doctor_specialties (public read)
CREATE POLICY "Anyone can view doctor specialties"
ON public.doctor_specialties FOR SELECT
USING (TRUE);

-- RLS Policies for diseases (public read)
CREATE POLICY "Anyone can view diseases"
ON public.diseases FOR SELECT
USING (TRUE);

-- RLS Policies for symptoms (public read)
CREATE POLICY "Anyone can view symptoms"
ON public.symptoms FOR SELECT
USING (TRUE);

-- RLS Policies for disease_symptoms (public read)
CREATE POLICY "Anyone can view disease symptoms"
ON public.disease_symptoms FOR SELECT
USING (TRUE);

-- RLS Policies for time_slots (public read)
CREATE POLICY "Anyone can view time slots"
ON public.time_slots FOR SELECT
USING (TRUE);

-- RLS Policies for appointments
CREATE POLICY "Patients can view their own appointments"
ON public.appointments FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.patients
        WHERE patients.patient_id = appointments.patient_id
        AND patients.user_id = auth.uid()
    )
);

CREATE POLICY "Doctors can view their appointments"
ON public.appointments FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.doctors
        WHERE doctors.doctor_id = appointments.doctor_id
        AND doctors.user_id = auth.uid()
    )
);

CREATE POLICY "Patients can create their own appointments"
ON public.appointments FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.patients
        WHERE patients.patient_id = appointments.patient_id
        AND patients.user_id = auth.uid()
    )
);

CREATE POLICY "Patients can update their own appointments"
ON public.appointments FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.patients
        WHERE patients.patient_id = appointments.patient_id
        AND patients.user_id = auth.uid()
    )
);

-- RLS Policies for medical_records
CREATE POLICY "Patients can view their medical records"
ON public.medical_records FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.appointments
        JOIN public.patients ON patients.patient_id = appointments.patient_id
        WHERE appointments.appointment_id = medical_records.appointment_id
        AND patients.user_id = auth.uid()
    )
);

CREATE POLICY "Doctors can view medical records for their appointments"
ON public.medical_records FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.appointments
        JOIN public.doctors ON doctors.doctor_id = appointments.doctor_id
        WHERE appointments.appointment_id = medical_records.appointment_id
        AND doctors.user_id = auth.uid()
    )
);

CREATE POLICY "Doctors can create medical records for their appointments"
ON public.medical_records FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.appointments
        JOIN public.doctors ON doctors.doctor_id = appointments.doctor_id
        WHERE appointments.appointment_id = medical_records.appointment_id
        AND doctors.user_id = auth.uid()
    )
);

-- Function to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.users (user_id, email, full_name, cccd, phone, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'cccd', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'patient')
    );
    RETURN NEW;
END;
$$;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();