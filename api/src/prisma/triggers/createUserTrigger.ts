import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function createTrigger() {
  const functionSql = `
CREATE OR REPLACE FUNCTION insert_user_role()
RETURNS TRIGGER AS $$
DECLARE
  role text;
BEGIN

  IF NEW.role IS NOT NULL AND array_length(NEW.role, 1) IS NOT NULL THEN
    FOREACH role IN ARRAY NEW.role
    LOOP
      IF role = 'ADMIN' THEN
        INSERT INTO admin (id, name, surname, email, password, phone, address, img, sex, created)
        VALUES (NEW.id, NEW.name, NEW.surname, NEW.email, NEW.password, NEW.phone, NEW.address, NEW.img, NEW.sex, NEW.created);
      ELSIF role = 'STUDENT' THEN
        INSERT INTO student (id, name, surname, email, password, phone, address, img, sex, created)
        VALUES (NEW.id, NEW.name, NEW.surname, NEW.email, NEW.password, NEW.phone, NEW.address, NEW.img, NEW.sex, NEW.created);
      ELSIF role = 'TEACHER' THEN
        INSERT INTO teacher (id, name, surname, email, password, phone, address, img, sex, created)
        VALUES (NEW.id, NEW.name, NEW.surname, NEW.email, NEW.password, NEW.phone, NEW.address, NEW.img, NEW.sex, NEW.created);
      ELSIF role = 'PARENT' THEN
        INSERT INTO parent (id, name, surname, email, password, phone, address, img, sex, created)
        VALUES (NEW.id, NEW.name, NEW.surname, NEW.email, NEW.password, NEW.phone, NEW.address, NEW.img, NEW.sex, NEW.created);
      END IF;
    END LOOP;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
  `;
  const triggerSql = `
    CREATE TRIGGER after_user_insert
    AFTER INSERT ON "user"
    FOR EACH ROW
    EXECUTE FUNCTION insert_user_role();
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


