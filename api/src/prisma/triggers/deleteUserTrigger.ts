import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function deleteUserTrigger() {
    const functionSql = `
    CREATE OR REPLACE FUNCTION cascade_delete_user()
    RETURNS TRIGGER AS $$
    BEGIN
      -- Delete from related role tables
      DELETE FROM admin WHERE id = OLD.id;
      DELETE FROM student WHERE id = OLD.id;
      DELETE FROM teacher WHERE id = OLD.id;
      DELETE FROM parent WHERE id = OLD.id;
    
      RETURN OLD;
    END;
    $$ LANGUAGE plpgsql;
      `;
  const triggerSql = `
    CREATE TRIGGER cascade_delete_user
    AFTER DELETE ON "user"
    FOR EACH ROW
    EXECUTE FUNCTION cascade_delete_user();
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


