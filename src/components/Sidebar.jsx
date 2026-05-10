import React, { useState, useRef } from 'react';
import { QUICK_REFERENCE, PATTERN_EXAMPLES } from "../utils/constants";
import { savedPatterns } from "../utils/storage";

function Sidebar({ setPattern, savedList, refreshList, onLoadPattern, onSave, onNew }) {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const [activeSection, setActiveSection] = useState(null);
  const fileInputRef = useRef(null);

  const sections = [
    { id: 'patterns', label: 'My Patterns', icon: 'fa-heart' },
    { id: 'examples', label: 'Examples', icon: 'fa-book' },
    { id: 'reference', label: 'Reference', icon: 'fa-circle-info' },
    { id: 'project', label: 'Open Source', icon: 'fa-code-fork' },
    { id: 'docs', label: 'Docs', icon: 'fa-file-lines' },
  ];

  const toggleSidebar = () => {
    if (!activeSection) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleSectionClick = (sectionId) => {
    if (isCollapsed) setIsCollapsed(false);
    setActiveSection(sectionId);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (savedPatterns.delete(id)) {
      refreshList();
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await savedPatterns.import(file);
      refreshList();
      alert("Patterns imported successfully!");
    } catch (err) {
      alert("Failed to import patterns: " + err.message);
    }
    e.target.value = null; // Reset input
  };

  const renderContent = () => {
    if (activeSection === 'reference') {
      return (
        <div className="sidebar-section-content">
          <div className="qr-grid">
            {QUICK_REFERENCE.map((item, i) => (
              <div key={i} className="qr-row">
                <span className="qr-token">{item.token}</span>
                <span className="qr-desc">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === 'examples') {
      return (
        <div className="sidebar-section-content">
          <div className="examples-list">
            {PATTERN_EXAMPLES.map((ex, i) => (
              <div
                key={i}
                className="example-item"
                onClick={() => setPattern(ex.pattern)}
              >
                <div className="example-header">
                  <span className="example-name">{ex.name}</span>
                  <span className="example-pattern">{ex.pattern}</span>
                </div>
                <div className="example-desc">{ex.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === 'patterns') {
      return (
        <div className="sidebar-section-content">
          <div className="sidebar-actions-row">
            <button className="sidebar-action-btn" onClick={() => savedPatterns.export()}>
              <i className="fa-solid fa-download"></i> Export
            </button>
            <button className="sidebar-action-btn" onClick={() => fileInputRef.current.click()}>
              <i className="fa-solid fa-upload"></i> Import
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".json"
              onChange={handleImport}
            />
          </div>
          <div className="examples-list">
            {savedList.length === 0 ? (
              <p className="sidebar-empty-msg">No saved patterns yet.</p>
            ) : (
              savedList.map((saved) => (
                <div
                  key={saved.id}
                  className="example-item"
                  onClick={() => onLoadPattern(saved)}
                >
                  <div className="example-header">
                    <span className="example-name">{saved.name}</span>
                    <button className="delete-btn" onClick={(e) => handleDelete(e, saved.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                  <div className="example-pattern">{saved.pattern.substring(0, 30)}{saved.pattern.length > 30 ? '...' : ''}</div>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (activeSection === 'project') {
      return (
        <div className="sidebar-section-content">
          <div className="sidebar-links-list">
            <a href="https://github.com/iamreiyn/lua-pattern-tester" target="_blank" rel="noreferrer" className="sidebar-link-item">
              <i className="fa-brands fa-github"></i>
              <span>Source Code</span>
            </a>
            <a href="https://github.com/iamreiyn/lua-pattern-tester/issues/new" target="_blank" rel="noreferrer" className="sidebar-link-item">
              <i className="fa-solid fa-bug"></i>
              <span>Submit Feedback</span>
            </a>
          </div>
        </div>
      );
    }

    if (activeSection === 'docs') {
      return (
        <div className="sidebar-section-content">
          <div className="sidebar-links-list">
            <a href="https://www.lua.org/manual/5.5/" target="_blank" rel="noreferrer" className="sidebar-link-item">
              <i className="fa-solid fa-book"></i>
              <span>Lua Manual</span>
            </a>
            <a href="https://www.lua.org/pil/20.2.html" target="_blank" rel="noreferrer" className="sidebar-link-item">
              <i className="fa-solid fa-clipboard"></i>
              <span>Cheatsheet</span>
            </a>
          </div>
        </div>
      );
    }

    return (
      <div className="sidebar-section-content">
        <div className="sidebar-placeholder">
          <p>Section "{sections.find(s => s.id === activeSection)?.label}" content coming soon.</p>
        </div>
      </div>
    );
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top-actions">
        {!isCollapsed && (
          <div className="sidebar-split-btns">
            <button className="sidebar-save-btn" onClick={onSave}>
              <i className="fa-solid fa-floppy-disk"></i> Save <span className="btn-hint">(ctrl+s)</span>
            </button>
            <button className="sidebar-new-btn" onClick={onNew}>
              <i className="fa-solid fa-plus"></i> New
            </button>
          </div>
        )}
      </div>

      <div className="sidebar-menu-header" onClick={toggleSidebar}>
        {activeSection && !isCollapsed ? (
          <div className="sidebar-active-header">
            <button className="sidebar-back-btn" onClick={(e) => {
              e.stopPropagation();
              setActiveSection(null);
            }}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <span className="sidebar-active-title">
              {sections.find(s => s.id === activeSection)?.label}
            </span>
          </div>
        ) : (
          <div className="sidebar-menu-title">
            <i className="fa-solid fa-list"></i>
            {!isCollapsed && <span>Menu</span>}
          </div>
        )}
        {!activeSection && !isCollapsed && <i className="fa-solid fa-xmark sidebar-menu-close"></i>}
      </div>

      {!activeSection || isCollapsed ? (
        <>
          <nav className="sidebar-nav">
            {sections.map((section) => (
              <button
                key={section.id}
                className={`sidebar-nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => handleSectionClick(section.id)}
                title={isCollapsed ? section.label : ''}
              >
                <i className={`fa-solid ${section.icon}`}></i>
                {!isCollapsed && (
                  <>
                    <span className="nav-label">{section.label}</span>
                    <i className="fa-solid fa-chevron-right chevron"></i>
                  </>
                )}
              </button>
            ))}
          </nav>

          {!isCollapsed && (
            <>
              <div className="sidebar-info">
                <p>
                  Lua Pattern Tester is an online tool to <strong>test</strong> and <strong>debug</strong> Lua patterns against your input.
                </p>
                <hr className="sidebar-divider" />
                <ul className="sidebar-info-list">
                  <li>A parser that explains what your pattern is doing.</li>
                  <li>See matches immediately as you type.</li>
                  <li>View exact string and position captures in color-coded cards.</li>
                  <li>Save, load, and export your patterns.</li>
                </ul>
              </div>

              <div className="sidebar-footer">
                <p><strong>Want to support?</strong> Share this tool with other developers!</p>
              </div>
            </>
          )}
        </>
      ) : (
        renderContent()
      )}
    </aside>
  );
}

export default Sidebar;
