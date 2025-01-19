import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function updateUserTrigger() {
  const functionSql = `
CREATE OR REPLACE FUNCTION update_user_info()
RETURNS TRIGGER AS $$
DECLARE
  role text;
BEGIN

  IF NEW.role IS NOT NULL AND array_length(NEW.role, 1) IS NOT NULL THEN
    FOREACH role IN ARRAY NEW.role
    LOOP
      IF role = 'ADMIN' THEN
        UPDATE admin
        SET name = NEW.name, surname = NEW.surname, email = NEW.email, 
            password = NEW.password, phone = NEW.phone, address = NEW.address, 
            img = NEW.img, sex = NEW.sex, created = NEW.created
        WHERE id = NEW.id;
      ELSIF role = 'STUDENT' THEN
        UPDATE student
        SET name = NEW.name, surname = NEW.surname, email = NEW.email, 
            password = NEW.password, phone = NEW.phone, address = NEW.address, 
            img = NEW.img, sex = NEW.sex, created = NEW.created
        WHERE id = NEW.id;
      ELSIF role = 'TEACHER' THEN
        UPDATE teacher
        SET name = NEW.name, surname = NEW.surname, email = NEW.email, 
            password = NEW.password, phone = NEW.phone, address = NEW.address, 
            img = NEW.img, sex = NEW.sex, created = NEW.created
        WHERE id = NEW.id;
      ELSIF role = 'PARENT' THEN
        UPDATE parent
        SET name = NEW.name, surname = NEW.surname, email = NEW.email, 
            password = NEW.password, phone = NEW.phone, address = NEW.address, 
            img = NEW.img, sex = NEW.sex, created = NEW.created
        WHERE id = NEW.id;
      END IF;
    END LOOP;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
  `;
  const triggerSql = `
CREATE TRIGGER update_user_info
AFTER UPDATE ON "user"
FOR EACH ROW
EXECUTE FUNCTION update_user_info();
  `;

  try {
   
    await prisma.$executeRawUnsafe(functionSql);
    console.log("Function created successfully!");
    await prisma.$executeRawUnsafe(triggerSql);
    console.log("Trigger created successfully!");
  } catch (error) {
    console.error("Error creating trigger: ", error);
  } finally {
    await prisma.$disconnect();
  }
}


