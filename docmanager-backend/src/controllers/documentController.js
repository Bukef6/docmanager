const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const path = require("path");
const fs = require("fs");

const UPLOAD_DIR = path.join(__dirname, "../../uploads");

// helper for pagination
const paginate = (page, pageSize) => {
  const limit = pageSize ? parseInt(pageSize) : 10;
  const offset = page ? (parseInt(page) - 1) * limit : 0;
  return { limit, offset };
};

// GET documents with filter and pagination
exports.getDocuments = async (req, res) => {
  const userId = req.userId;
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const { tag, search } = req.query;

  const where = {
    ownerId: userId,
    ...(!tag || tag === "All" ? {} : { tag }),
  };

  if (search && search.trim() !== "") {
    const s = search.trim();

    if (s.length < 3) {
      where.title = {
        startsWith: s,
        // mode: "insensitive",
      };
    } else {
      where.title = {
        contains: s,
        //mode: "insensitive",
      };
    }
  }

  const { limit, offset } = paginate(page, pageSize);

  const documents = await prisma.document.findMany({
    where,
    skip: offset,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.document.count({ where });
  res.json({ documents, total });
};

// CREATE document
exports.createDocument = async (req, res) => {
  const userId = req.userId;
  const { title, tag } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: "File missing" });

  const doc = await prisma.document.create({
    data: {
      title,
      tag,
      filePath: file.filename,
      size: file.size,
      ownerId: userId,
    },
  });

  res.status(201).json({ message: "Document created", doc });
};

// UPDATE dokument (title and tag)
exports.updateDocument = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;
  const { title, tag } = req.body;

  const doc = await prisma.document.findUnique({ where: { id: parseInt(id) } });
  if (!doc || doc.ownerId !== userId)
    return res.status(403).json({ message: "Not authorized" });

  const updated = await prisma.document.update({
    where: { id: parseInt(id) },
    data: { title, tag },
  });

  res.json({ message: "Document updated", updated });
};

// DELETE dokument
exports.deleteDocument = async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  const doc = await prisma.document.findUnique({ where: { id: parseInt(id) } });
  if (!doc || doc.ownerId !== userId)
    return res.status(403).json({ message: "Not authorized" });

  // remove file
  const filePath = path.join(UPLOAD_DIR, doc.filePath);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  await prisma.document.delete({ where: { id: parseInt(id) } });

  res.json({ message: "Document deleted" });
};

exports.downloadDocument = async (req, res) => {
  const userId = req.userId;
  const id = Number(req.params.id);
  const doc = await prisma.document.findUnique({ where: { id } });

  if (!doc) return res.status(404).send("Not found");
  if (!doc || doc.ownerId !== userId)
    return res.status(403).json({ message: "Not authorized" });
  const filePath = path.join(__dirname, "../../uploads", doc.filePath);

  res.download(filePath, doc.originalName);
};
